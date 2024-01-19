import React, { useEffect } from "react";
import Select from "../Select";

export const options = [
  { color: "#FF0000", label: "Red" },
  { color: "#0000FF", label: "Blue" },
  { color: "#006400", label: "Green" },
  { color: "#FF6600", label: "Orange" },
  { color: "#FFFFFF", label: "White" },
  { color: "#000000", label: "Black" },
  { color: "#FFFF00", label: "Yellow" },
  { color: "#A020F0", label: "Purple" },
  { color: "#C0C0C0", label: "Silver" },
  { color: "#964B00", label: "Brown" },
  { color: "#808080", label: "Gray" },
  { color: "#FFC0CB", label: "Pink" },
  { color: "#808000", label: "Olive" },
  { color: "#800000", label: "Maroon" },
  { color: "#8F00FF", label: "Violet" },
  { color: "#36454F", label: "Charcoal" },
  { color: "#FF00FF", label: "Magenta" },
  { color: "#CD7F32", label: "Bronze" },
  { color: "#FFFDD0", label: "Cream" },
  { color: "#FFD700", label: "Gold" },
  { color: "#D2B48C", label: "Tan" },
  { color: "#008080", label: "Teal" },
  { color: "#FFDB58", label: "Mustard" },
  { color: "#000080", label: "Navy Blue" },
  { color: "#FF7F50", label: "Coral" },
  { color: "#800020", label: "Burgundy" },
  { color: "#E6E6FA", label: "Lavender" },
  { color: "#E0B0FF", label: "Mauve" },
  { color: "#FFE5B4", label: "Peach" },
  { color: "#B7410E", label: "Rust" },
  { color: "#4B0082", label: "Indigo" },
  { color: "#E0115F", label: "Ruby" },
  { color: "#CC7357", label: "Clay" },
  { color: "#00FFFF", label: "Cyan" },
  { color: "#007FFF", label: "Azure" },
  { color: "#F5F5DC", label: "Beige" },
  { color: "#FAF9F6", label: "Off White" },
  { color: "#30D5C8", label: "Turquoise" },
  { color: "#FFBF00", label: "Amber" },
  { color: "#3EB489", label: "Mint" }
]

const ColorSelect = (props) => {
  const { label, name } = props

  useEffect(() => {
    colorvalue();
  }, []);

  const colorOptions = options.map(({ label, color }) => ({
    value: color,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "16px",
            height: "16px",
            backgroundColor: color,
            marginRight: "8px",
          }}
        />
        {label}
      </div>
    ),
  }));

  const colorvalue = () => {
    props.setColor(colorOptions);
  }

  return (
    <Select
      label={label}
      name={name ? name : "color"}
      options={colorOptions}
    />
  );
};

export default ColorSelect;
