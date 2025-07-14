// lib/middleware/validateFormData.js
export async function validateFormData(req) {
  const contentType = req.headers.get("content-type") || "";

  if (
    !contentType.includes("multipart/form-data") &&
    !contentType.includes("application/x-www-form-urlencoded")
  ) {
    return {
      error: true,
      message: "Unsupported Content-Type",
    };
  }

  const dataObj = await req.json();

  if (Object.keys(dataObj).length === 0) {
    return {
      error: true,
      message: "Form data is empty",
    };
  }

  // Optional: Add more field validations here

  return {
    error: false,
    data: dataObj,
  };
}
