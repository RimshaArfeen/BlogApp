

 export const formatDate = (dateString) => {
     return new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
     });
}

//Truncate description to 150 characters
export const truncateText = (text, length) =>
     text.length > length ? text.slice(0, length) + "..." : text;