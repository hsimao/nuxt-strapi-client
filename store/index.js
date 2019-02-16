import cookieParse from "cookieparser";

export const actions = {
  // 在伺服器端先解析用戶cookie取得user資料
  nuxtServerInit({ commit }, { req }) {
    let user = null;
    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieParse.parse(req.headers.cookie);
      user = (parsed.user && JSON.parse(parsed.user)) || null;
    }

    commit("auth/setUser", user);
  }
};
