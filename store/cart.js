import Cookies from "js-cookie";

export const state = () => ({
  items: []
});
export const mutations = {
  setItems(state, items) {
    state.items = items;
  },

  // 新增前先判斷是否已存在，若存在則新增數量即可
  increase(state, item) {
    // console.log("yo", item);
    const record = state.items.find(i => i._id === item._id);
    // console.log("yoyo", record);

    if (!record) {
      state.items.push({
        quantity: 1,
        ...item
      });
    } else {
      record.quantity++;
    }
    console.log("store items: ", state.items);

    Cookies.set("cart", state.items);
  },

  // 刪除產品,  判斷數量是否大於1, 大於則減數量, 否則直接刪除整個item
  decrease(state, item) {
    const record = state.items.find(i => i._id === item._id);

    if (record.quantity > 1) {
      record.quantity--;
    } else {
      const index = state.items.findIndex(i => i._id === item._id);
      state.items.splice(index, 1);
    }

    Cookies.set("cart", state.items);
  },

  // 直接刪除整個item
  removeItem(state, id) {
    const index = state.items.findIndex(i => i._id === id);
    state.items.splice(index, 1);
    Cookies.set("cart", state.items);
  }
};

export const getters = {
  items: state => state.items,
  price: state => {
    return state.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  },
  numberOfItems: state => {
    return state.items.reduce((acc, item) => acc + item.quantity, 0);
  }
};
