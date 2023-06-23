export default function sliceProdTitle(title: string, max: number = 40) {
  return title.length > max ? `${title.slice(0, max)}...` : title;
}
