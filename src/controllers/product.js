import { Product } from "../models/Product.js";

export async function createProduct(req, res) {
    const { body } = req;
    try {
        const newProduct = await Product.create(body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function getProducts(req, res) {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getProduct(req, res) {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateProduct(req, res) {
    const { id } = req.params;
    const { body } = req;
    const options = { new: true };
    try {
        const product = await Product.findByIdAndUpdate(id, {$set:body}, options);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: error.message });
        
    }
}

export async function deleteProduct(req, res) {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product has been deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getProductStats(req, res) {
    try {
        const stats = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function getMonthlyIncome(req, res) {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const income = await Product.aggregate([
            {
                $match: { createdAt: { $gte: lastYear } },
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    total: { $sum: "$price" },
                },
            },
        ]);
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
