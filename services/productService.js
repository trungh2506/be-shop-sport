import Product from "../models/productModel.js";

async function getProducts(page, page_size) {
  try {
    const total = await Product.countDocuments();
    if (!page) {
      const products = await Product.find();
      return products;
    } else {
      const skip = (page - 1) * page_size;
      const products = await Product.find().skip(skip).limit(page_size);
      const total_page = Math.ceil(total / page_size);
      return {
        data: products,
        meta: {
          pagination: {
            page: page,
            pageSize: page_size,
            total: total,
            totalPage: total_page,
          },
        },
      };
    }
  } catch (error) {
    throw error;
  }
}

async function getProductById(product_id) {
  try {
    const product = await Product.findById(product_id);
    return product;
  } catch (error) {
    throw error;
  }
}

async function addProduct(product) {
  try {
    const new_product = new Product(product);
    await new_product.save();
    return new_product;
  } catch (error) {
    throw error;
  }
}

async function deleteProduct(product_id) {
  try {
    const product = await Product.findById(product_id);
    if (product) product.is_deleted = true;
    await product.save();
    return product;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(product_id, product) {
  try {
    const update_product = await Product.findByIdAndUpdate(product_id, product);
    return update_product;
  } catch (error) {
    throw error;
  }
}

export {
  getProducts,
  getProductById,
  addProduct,
  deleteProduct,
  updateProduct,
};
