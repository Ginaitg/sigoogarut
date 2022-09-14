import axios from "axios";

export const base_url = "https://nameless-ocean-79114.herokuapp.com/api/";
export const base_uploads = "https://nameless-ocean-79114.herokuapp.com";

import { Storage } from 'expo-storage';

export const checkLogin = (_) => async (dispatch) => {
  const item = await Storage.getItem({ key: `token` });
  if (item) {
    axios
      .get(base_url + "users/me", {
        headers: {
          Authorization: "Bearer " + item,
        },
      })
      .then((res) => {
        dispatch({ type: "SET_LOGIN", payload: true });
        dispatch({ type: "SET_USER", payload: res.data });
      });
  } else {
    dispatch({ type: "SET_LOGIN", payload: false });
  }
};

export const login = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .post(base_url + "auth/local", data, {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      })
      .then(async (res) => {
        dispatch({ type: "SET_LOGIN", payload: true });
        const token = res.data.jwt;
        await Storage.setItem({
          key: `token`,
          value: token,
        });
        resolve();
      })
      .catch((err) => {
        // alert(JSON.stringify(err.response));
        reject();
      });
  });
};
export const register = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .post(base_url + "auth/local/register", data, {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      })
      .then(async (res) => {
        dispatch({ type: "SET_LOGIN", payload: true });
        const token = res.data.jwt;
        await Storage.setItem({
          key: `token`,
          value: token,
        });
        resolve();
      })
      .catch((err) => {
        // alert(JSON.stringify(err.response));
        reject();
      });
  });
};
export const kirimKomen = (data) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    axios
      .post(base_url + "data-komentars", data, {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        headers: {
          Authorization: "Bearer " + (await Storage.getItem({ key: `token` })),
        },
      })
      .then(async (res) => {
        resolve();
      })
      .catch((err) => {
        // alert(JSON.stringify(err.response));
        reject();
      });
  });
};

export const logout = (data) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch({ type: "SET_LOGIN", payload: false });
    await Storage.setItem({
      key: `token`,
      value: null,
    });
    resolve();
  });
};

export const dataTempat = (keyword) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    axios
      .get(base_url + "data-tempats?populate=*", {
        headers: {
          Authorization: "Bearer " + (await Storage.getItem({ key: `token` })),
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        // alert(JSON.stringify(err.response));
        reject(err);
      });
  });
};
export const getFavorit = (id, tempat) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    axios
      .get(
        base_url +
          "favorits?filters[$and][0][data_tempat][id][$eq]=" +
          tempat +
          "&filters[$and][1][id_user][id][$eq]=" +
          id,
        {
          headers: {
            Authorization:
              "Bearer " + (await Storage.getItem({ key: `token` })),
          },
        }
      )
      .then((res) => {
        if (res.data.data.length === 0) {
          throw "error";
        }
        // alert(JSON.stringify(res.data));
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const getUserFavorit = (id) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    axios
      .get(
        base_url +
          "favorits?populate[data_tempat][populate]=*&filters[id_user][id][$eq]=" +
          id,
        {
          headers: {
            Authorization:
              "Bearer " + (await Storage.getItem({ key: `token` })),
          },
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const tambahFavorit = (data) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    axios
      .post(base_url + "favorits", data, {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        headers: {
          Authorization: "Bearer " + (await Storage.getItem({ key: `token` })),
        },
      })
      .then(async (res) => {
        resolve();
      })
      .catch((err) => {
        // alert(JSON.stringify(err.response));
        reject();
      });
  });
};
export const deletFavorit = (data) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    axios
      .delete(base_url + "favorits", data, {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        headers: {
          Authorization: "Bearer " + (await Storage.getItem({ key: `token` })),
        },
      })
      .then(async (res) => {
        resolve();
      })
      .catch((err) => {
        // alert(JSON.stringify(err.response));
        reject();
      });
  });
};
export const dataTempatById = (id) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    axios
      .get(
        base_url +
          "data-tempats/" +
          id +
          "?populate[data_komentars][populate]=*",
        {
          headers: {
            Authorization:
              "Bearer " + (await Storage.getItem({ key: `token` })),
          },
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        // alert(JSON.stringify(err.response));
        reject(err);
      });
  });
};
export const getMedia = (id) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    axios
      .get(base_url + "data-tempats/" + id + "?populate=*", {
        headers: {
          Authorization: "Bearer " + (await Storage.getItem({ key: `token` })),
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        // alert(JSON.stringify(err.response));
        reject(err);
      });
  });
};
export const getKomentar = (id) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    axios
      .get(base_url + "data-komentars?populate[id_tempat][$eq]=" + id, {
        headers: {
          Authorization: "Bearer " + (await Storage.getItem({ key: `token` })),
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        // alert(JSON.stringify(err.response));
        reject(err);
      });
  });
};

export const getKomentaruser = (id) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    axios
    .get(base_url + "data-komentars?populate[id_user][$eq]=" + id,{
          headers: {
            Authorization:
              "Bearer " + (await Storage.getItem({ key: `token` })),
          },
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
