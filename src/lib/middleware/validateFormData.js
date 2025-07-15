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

  const formData = await req.formData(); // ✅ instead of req.json()

  const dataObj = {};
  for (const [key, value] of formData.entries()) {
    dataObj[key] = value;
  }

  if (Object.keys(dataObj).length === 0) {
    return {
      error: true,
      message: "Form data is empty",
    };
  }

  // Optional: Add more field validation here
  return {
    error: false,
    data: dataObj,
  };
}
