import {
  ADD_COUNTER,
  ADD_TO_CART
} from "@/store/mutations-types";

export default {
  addCart(context, payload) {
    //payLoad新添加的商品
    let oldProduct = context.state.cartList.find(item => item.id === payload.id)
    //判断oldProduct
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
  }
}