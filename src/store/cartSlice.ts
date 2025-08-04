import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import cartApi from "../api/cartApi";
import { CartItem, CartItemAttributies } from "../types/index";

interface CartItemState {
  listCartItem: CartItem[];
  totalPrice: number;
  totalProduct: number;
  currentCartItem: CartItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartItemState = {
  listCartItem: [],
  currentCartItem: null,
  totalProduct: 0,
  totalPrice: 0,
  loading: false,
  error: null,
};

// Async thunks
export const fetchCart = createAsyncThunk(
  "cart/listCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartApi.getAll();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tải sản phẩm"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartItem: Partial<CartItemAttributies>, { rejectWithValue }) => {
    try {
      const response = await cartApi.create(cartItem);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tạo sản phẩm"
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    { id, cartItem }: { id: number; cartItem: Partial<CartItemAttributies> },
    { rejectWithValue }
  ) => {
    try {
      const response = await cartApi.update(id, cartItem);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi cập nhật sản phẩm"
      );
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (id: number, { rejectWithValue }) => {
    try {
      await cartApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi xóa sản phẩm"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCurrentCart: (state) => {
      state.currentCartItem = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch get list cart item
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.listCartItem = action.payload;
		state.totalPrice = action.payload.reduce((sum, item) => sum + item.productSize.products.price* item.quantity, 0)
		state.totalProduct = action.payload.reduce((sum, item) => sum + item.quantity, 0)
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        // kiem tra da co trong danh sach hay chưa
        // neu có thì cạp nhật lại thôi
        const index = state.listCartItem.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.listCartItem[index] = action.payload;
        } else {
			// nếu chưa có thì thêm mới vaod danh sách
			state.listCartItem.push(action.payload);
        }
		state.totalPrice = state.listCartItem.reduce((sum, item) => sum + item.productSize.products.price* item.quantity, 0)
		state.totalProduct = state.listCartItem.reduce((sum, item) => sum +  item.quantity, 0)
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update CartItem
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.listCartItem.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.listCartItem[index].quantity = action.payload.quantity;
        }
		state.totalPrice = state.listCartItem.reduce((sum, item) => sum + item.productSize.products.price* item.quantity, 0);
		state.totalProduct = state.listCartItem.reduce((sum, item) => sum + item.quantity, 0);
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete product
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.listCartItem = state.listCartItem.filter(
          (p) => p.id !== action.payload
        );
		state.totalPrice = state.listCartItem.reduce((sum, item) => sum + item.productSize.products.price* item.quantity, 0);
		state.totalProduct = state.listCartItem.reduce((sum, item) => sum + item.quantity, 0);

      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentProduct, clearError } = cartSlice.actions;
export default cartSlice.reducer;
