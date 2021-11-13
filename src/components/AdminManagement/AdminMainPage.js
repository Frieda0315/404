import { Grid, Card, Typography } from "@material-ui/core";

const dummy = [
  {
    url: "123",
    user_name: "333",
    password: "abc",
  },
  {
    url: "123",
    user_name: "333",
    password: "abc",
  },
  {
    url: "123",
    user_name: "333",
    password: "abc",
  },
  {
    url: "123",
    user_name: "333",
    password: "abc",
  },
];
const AdminMainPage = () => {
  return (
    <Grid container spacing={"3"}>
      <Grid item>
        <Card>
          <Typography variant="h4">Node List</Typography>
          {dummy.map((n) => {
            <Grid
              item
              xs={8}
              justifyContent="flex-start"
              alignItems="flex-start"
              backgroundColor="#fff"
              borderBottom="1.2px solid #f0f2f7"
              padding="30px"
              boxShadow="0 1px 3px rgb(18 18 18 / 10%)"
              marginLeft={50}
              marginRight={50}
            >
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Grid container direction="row" spacing={2}>
                    <Grid item>
                      <Typography>abc</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item marginLeft={7}>
                  <Typography>{n.user_name}</Typography>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
              ></Grid>
            </Grid>;
          })}
        </Card>
      </Grid>
      <Grid item>aaaa</Grid>
    </Grid>
  );
};

export default AdminMainPage;
