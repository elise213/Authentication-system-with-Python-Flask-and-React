const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      syncTokenFromSessionStore: () => {
        const token = sessionStorage.getItem("token");
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },

      logout: () => {
        const token = sessionStorage.removeItem("token");
        setStore({ token: null });
        // window.location.href ="hhttps://3000-4geeksacade-reactflaskh-yc2lbl6sw3j.ws-eu87.gitpod.io/" (relocates to homepage)
      },

      login: async (email, password) => {
        const opts = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const res = await fetch(
            "https://3001-4geeksacade-reactflaskh-yc2lbl6sw3j.ws-eu87.gitpod.io/api/login",
            opts
          );
          if (res.status !== 200) {
            alert("there has been an error");
            return false;
          }
          const data = await res.json();
          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          return true;
        } catch (error) {
          console.error(error);
        }
      },

      createUser: async (name, email, password) => {
        const store = getStore();
        const opts = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        };
        try {
          const res = await fetch(
            "https://3001-4geeksacade-reactflaskh-yc2lbl6sw3j.ws-eu87.gitpod.io/api/createUser",
            opts
          );
          if (res.status !== 200) {
            alert("there has been an error");
            return false;
          }
          const data = await res.json();
          console.log(data);
          if (data.status == "true") {
            //rederect to login
            window.location.href =
              "https://3000-4geeksacade-reactflaskh-yc2lbl6sw3j.ws-eu87.gitpod.io/login";
          }

          return true;
        } catch (error) {
          console.error(error);
        }
      },

      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
