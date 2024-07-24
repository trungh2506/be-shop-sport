import {
  getProducts,
  getProductById,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../services/productService.js";
import cloudinary from "../config/cloudinary.config.js";
import fs from "fs";
import path from "path";

async function getProductsController(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 6;
    const orderBy = req.query.orderBy ? JSON.parse(req.query.orderBy) : {};
    const isHot = req.query.hot ? req.query.hot === "true" : undefined;
    const isSale = req.query.sale ? req.query.sale === "true" : undefined;
    const result = await getProducts(page, pageSize, orderBy, isHot, isSale);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getProductsByIdController(req, res) {
  try {
    const product_id = req.params.id;
    const result = await getProductById(product_id);
    if (result) {
      return res.status(200).json(result);
    } else return res.status(404).json({ message: "not found product!" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function deleteProductController(req, res) {
  try {
    const product_id = req.params.id;
    const result = await deleteProduct(product_id);
    if (result) {
      return res.status(200).json({ message: "delete successfull!" });
    } else return res.status(404).json({ message: "not found product id!" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function addProductController(req, res) {
  try {
    //handle upload image to cloudinary
    const uploadedImages = [];
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        uploadedImages.push(result.secure_url);
        // Xóa tệp tạm
        fs.unlinkSync(file.path);
      }
    }

    const product = { ...req.body, images: uploadedImages };
    const new_product = await addProduct(product);
    res.status(200).json(new_product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function updateProductController(req, res) {
  try {
    const product_id = req.params.id;
    const product = req.body;
    if (!req.files) {
      const updated_product = await updateProduct(product_id, product);
      if (updateProduct) {
        return res
          .status(200)
          .json({ message: "updated product successfully!" });
      } else return res.status(404).json({ message: "not found product" });
    } else
      return res.status(404).json({ message: "the feature is coming soon!" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
export {
  getProductsController,
  getProductsByIdController,
  updateProductController,
  deleteProductController,
  addProductController,
};
