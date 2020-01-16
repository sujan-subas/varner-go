export function getSize(description) {
  return description.slice(-1);
}

export function getColor(description) {
  //separate color content from variant number
  const step1 = description.split("/");
  //separate color in string
  const step2 = step1[1].split(" ");
  //return color
  return step2[0];
}
export function getProductDescription(description) {
  //return description without str.
  return description.slice(0, -4);
}
