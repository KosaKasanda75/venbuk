const PostOptions = {
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

const GetOptions = {
  method: "GET",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

const PutOptions = {
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

const DeleteOptions = {
  method: "DELETE",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

export { PostOptions, GetOptions, PutOptions, DeleteOptions };
