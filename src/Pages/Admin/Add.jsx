import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { setProducts } from "@/ReduxToolKit/Products";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "@/config/app";


export const Add = () => {
  const dispatch = useDispatch();

  // 🔹 INITIAL STATE (IMPORTANT)
  const initialState = {
    productsName: "",
    productsPrice: "",
    productsImg: [],
    productDescription: "",
    rating: "",
    Category: "",
    BrandName: "",
  };

  const [AddProduct, SetAddProduct] = useState(initialState);

  // 🔹 file input ref (to clear image input)
  const fileInputRef = useRef(null);

  // INPUT CHANGE
  const handleAddProduct = (e) => {
    SetAddProduct({
      ...AddProduct,
      [e.target.name]: e.target.value,
    });
  };

  // IMAGE CHANGE
  const handleImageChange = (e) => {
    SetAddProduct((prev) => ({
      ...prev,
      productsImg: Array.from(e.target.files),
    }));
  };

  // SUBMIT
  const SubmitAddProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("productsName", AddProduct.productsName);
      formData.append("productsPrice", AddProduct.productsPrice);
      formData.append("productDescription", AddProduct.productDescription);
      formData.append("rating", AddProduct.rating);
      formData.append("Category", AddProduct.Category);
      formData.append("BrandName", AddProduct.BrandName);

      if (AddProduct.productsImg.length === 0) {
        toast.error("Please upload at least one image");
        return;
      }

      AddProduct.productsImg.forEach((img) => {
        formData.append("file", img);
      });

      const response = await axios.post(
        `${API_URL}/admin/addProducts`,
        formData
      );


      if (response.data.success) {
        toast.success("Product added successfully");
        dispatch(setProducts(response.data.user));

        // ✅ RESET ALL FIELDS
        SetAddProduct(initialState);

        // ✅ CLEAR FILE INPUT VISUALLY
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Add product failed");
    }
  };

  return (
    <section className="w-full min-h-screen px-4 flex items-start">
      <Card className="w-full max-w-4xl shadow-2xl border-none bg-white overflow-hidden">

        {/* HEADER */}
        <CardHeader className="bg-slate-50 border-b p-8">
          <CardTitle className="text-3xl font-extrabold text-slate-900">
            Add New Product
          </CardTitle>
          <CardDescription className="text-slate-500">
            Fill out the details to add a new product
          </CardDescription>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* LEFT */}
            <div className="space-y-6">
              <div>
                <Label>Product Name</Label>
                <Input
                  name="productsName"
                  value={AddProduct.productsName}
                  onChange={handleAddProduct}
                  placeholder="Product name"
                />
              </div>

              <div>
                <Label>Price</Label>
                <Input
                  name="productsPrice"
                  value={AddProduct.productsPrice}
                  onChange={handleAddProduct}
                  placeholder="₹ 0.00"
                />
              </div>

              <div>
                <Label>Category</Label>
                <Input
                  name="Category"
                  value={AddProduct.Category}
                  onChange={handleAddProduct}
                  placeholder="Shoes"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              <div>
                <Label>Brand Name</Label>
                <Input
                  name="BrandName"
                  value={AddProduct.BrandName}
                  onChange={handleAddProduct}
                />
              </div>

              <div>
                <Label>Rating</Label>
                <Input
                  name="rating"
                  value={AddProduct.rating}
                  onChange={handleAddProduct}
                />
              </div>

              <div>
                <Label>Images</Label>
                <Input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <Label>Description</Label>
            <Textarea
              name="productDescription"
              value={AddProduct.productDescription}
              onChange={handleAddProduct}
              placeholder="Product details..."
            />
          </div>
        </CardContent>

        {/* FOOTER */}
        <CardFooter className="bg-slate-50 border-t p-8 flex justify-end">
          <Button
            className="bg-pink-600 hover:bg-pink-700 text-white px-10"
            onClick={SubmitAddProduct}
          >
            Add Product
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};
