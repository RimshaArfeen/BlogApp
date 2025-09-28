//utils/index.js

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

//Slugify
export const slugify = (text) => 
     text
          .toString()         
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-") // Replace spaces with -
          .replace(/[^\w\-]+/g, "") // Remove all non-word chars
          .replace(/\-\-+/g, "-"); // Replace multiple - with single -
          // .replace(/;/g, '-');
