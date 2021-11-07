import { CardMedia, Grid } from "@mui/material";

const ImageHolder = ({ image }) => {
  return (
    <Grid container>
      <CardMedia component="img" image={image} alt="fda" />
    </Grid>
  );
};

export default ImageHolder;
