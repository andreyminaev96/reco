import { Box, styled, BoxProps } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Контейнер, складывающий иконки вертикально
const IconContainer = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  flexDirection: "column",
  marginLeft: theme.spacing(0.5),
  "& svg": {
    fontSize: "1rem",
    lineHeight: 1,
  },
}));

interface DoubleSortIconProps extends BoxProps {
  direction?: "asc" | "desc";
  active?: boolean;
}

export default function DoubleSortIcon({
  direction,
  active,
}: DoubleSortIconProps) {
  const upColor =
    active && direction === "asc" ? "text.primary" : "text.disabled";
  const downColor =
    active && direction === "desc" ? "text.primary" : "text.disabled";

  return (
    <IconContainer>
      <ArrowDropUpIcon sx={{ color: upColor }} />
      <ArrowDropDownIcon sx={{ color: downColor, mt: "-8px" }} />
    </IconContainer>
  );
}
