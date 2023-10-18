const API = import.meta.env.VITE_API_URL +  "/accounts";

export const getAccountData = async (email) => {
   const TOKEN = localStorage.getItem("token");

   const response = await fetch(`${API}/email/${email}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN
      },
   });

   if (response.ok) {
      const account = await response.json();
      localStorage.setItem("account", JSON.stringify(account));
   }
};