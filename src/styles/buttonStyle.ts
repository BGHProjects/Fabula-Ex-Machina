/**
 * Common styling for a button in the app
 *
 * @param width The width of the button
 * @param height The height of the button
 * @returns The styling for the button
 */
const buttonStyle = (width: number, height: number) => {
  return {
    alignItems: "center",
    justifyContent: "center",
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: "10px",
    border: "3px solid white",
    zIndex: "2",
    position: "relative",
    cursor: "pointer",
  };
};

export default buttonStyle;
