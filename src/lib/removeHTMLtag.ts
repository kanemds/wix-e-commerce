const removeHTMLtag = (
  input: string | null | undefined
): string => {
  if (!input) {
    return "Sorry, this product description is not yet available."
  }
  return input.replace(/<[^>]*>/g, "")
}

export default removeHTMLtag
