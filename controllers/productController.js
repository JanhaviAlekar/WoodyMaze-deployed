import productModel from "../models/productModel.js"
import categoryModel from "../models/categoryModel.js"
import orderModel from "../models/orderModel.js";
import fs from 'fs'
import slugify from 'slugify';
import braintree from "braintree";
import dotenv from 'dotenv'
dotenv.config();
//payment gateway

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
            case !name:
                return req.status(500).send({ error: "name is required" })
            case !description:
                return req.status(500).send({ error: "description is required" })
            case !price:
                return req.status(500).send({ error: "price is required" })
            case !category:
                return req.status(500).send({ error: "category is required" })
            case !quantity:
                return req.status(500).send({ error: "quantity is required" })

            case photo && photo.size > 1000000:
                return req.status(500).send({ error: " photo is required and should be less than 1 mb" })
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "product created successfully",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in creating product",
            error
        })
    }
}

export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate("category").select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(201).send({
            success: true,
            totalCount: products.length,
            message: "product listed successfully",
            products

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in getting all product",
            error
        })
    }
}

export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(201).send(product.photo.data)
        }


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in getting single product",
            error
        })
    }
}

// get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror while getitng single product",
            error,
        });
    }
};
export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
            case !name:
                return req.status(500).send({ error: "name is required" })
            case !description:
                return req.status(500).send({ error: "description is required" })
            case !price:
                return req.status(500).send({ error: "price is required" })
            case !category:
                return req.status(500).send({ error: "category is required" })
            case !quantity:
                return req.status(500).send({ error: "quantity is required" })

            case photo && photo.size > 1000000:
                return req.status(500).send({ error: " photo is required and should be less than 1 mb" })
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {
                ...req.fields, slug: slugify(name)
            },
            {
                new: true
            })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "product updated successfully",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in updating product",
            error
        })
    }
}

//delete
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(201).send({
            success: true,
            message: "A  product deleted successfully",


        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in deleting  a product",
            error
        })
    }
}

export const productFilterController = async (req, res) => {
    try {
        const { checked, radio } = req.body
        const args = {} // query
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productModel.find(args)
        res.status(200).send({
            sucess: true,
            products
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            messgae: " error while filtering",
            error
        })
    }
}

export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Error in product count",
            error,
            success: false
        })
    }
}
// product list base on page
export const productListController = async (req, res) => {
    try {
        const perPage = 3
        const page = req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort(({ createdAt: -1 }));
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Error in product count",
            error,
            success: false
        })
    }
}

export const searchProductController = async (req, res) => {
    try {
        const { keywords } = req.params
        const results = await productModel.find({
            $or: [
                { name: { $regex: keywords, $options: "i" } },
                { description: { $regex: keywords, $options: "i" } }
            ]
        }).select("-photo");
        res.json(results);
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Error in searching a product",
            error,
            success: false
        })
    }
};

export const getSimilarProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid }
        }).select("-photo").limit(3).populate("category");
        res.status(200).send({
            success: true,
            message: "Similar products",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Error in getting similar product a product",
            error,
            success: false
        })
    }
}

// getting products by category
export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        const product = await productModel.find({ category }).populate("category")
        res.status(200).send({
            success: true,
            message: "",
            product,
            category
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Error in getting ",
            error,
            success: false
        })
    }
}
//payment gateway api
export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.send(response)
            }
        })
    } catch (error) {
        console.log(error);
    }
}

//payment
export const braintreePaymentController = async (req, res) => {
    try {
        const { nonce, cart } = req.body;
        let total = 0;
        cart.map((i) => {
            total += i.price;
        });
        let newTransaction = gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },
            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id,
                    }).save();
                    res.json({ ok: true });
                } else {
                    res.status(500).send(error);
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
};