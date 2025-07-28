import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import productApi from '../api/productApi';
import { Product, ProductAttributes } from '../types';

interface ProductState {
    products: Product[];
    currentProduct: Product | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
};

// Async thunks
export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await productApi.getAll();
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Lỗi khi tải sản phẩm');
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'product/fetchProductById',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await productApi.getById(id);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Lỗi khi tải chi tiết sản phẩm');
        }
    }
);

export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (productData: Partial<ProductAttributes>, { rejectWithValue }) => {
        try {
            const response = await productApi.create(productData);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Lỗi khi tạo sản phẩm');
        }
    }
);

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({ id, productData }: { id: number; productData: Partial<ProductAttributes> }, { rejectWithValue }) => {
        try {
            const response = await productApi.update(id, productData);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Lỗi khi cập nhật sản phẩm');
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id: number, { rejectWithValue }) => {
        try {
            await productApi.delete(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Lỗi khi xóa sản phẩm');
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearCurrentProduct: (state) => {
            state.currentProduct = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch product by id
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create product
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                if (state.currentProduct?.id === action.payload.id) {
                    state.currentProduct = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Delete product
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(p => p.id !== action.payload);
                if (state.currentProduct?.id === action.payload) {
                    state.currentProduct = null;
                }
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearCurrentProduct, clearError } = productSlice.actions;
export default productSlice.reducer; 