const API = "http://localhost:8090/api/accounts";

export const getAccountData = async (email) => {
   const TOKEN = localStorage.getItem("token");

   const response = await fetch(`${API}/email/${email}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN
      },
   });

   const account = await response.json();
   localStorage.setItem("account", JSON.stringify(account));
}