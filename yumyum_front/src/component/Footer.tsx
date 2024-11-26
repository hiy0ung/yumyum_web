import Box from "@mui/material/Box";

export default function Footer() {
  return (
    <Box sx={{ display: "flex" }}>
        <Box component="footer" sx={{ py: 2, textAlign: "center", borderTop: "1px solid #ccc", mt: "auto", marginTop: "20px", width: "100%"}}>
          © 2024 Your Company
        </Box>
      </Box>
  );
}