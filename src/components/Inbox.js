import React from "react";
import { Card, Typography, IconButton, Avatar, Fab } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import { ShareRounded, ThumbUp, Comment } from "@material-ui/icons";
import Popup from "./Popup";
import Share from "./Share";
import makeStyles from "@material-ui/styles/makeStyles";

const tempInbox = {
  type: "inbox",
  author: "http://127.0.0.1:5454/author/c1e3db8ccea4541a0f3d7e5c75feb3fb",
  items: [
    {
      type: "post",
      title: "A Friendly post title about a post about web dev",
      id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/764efa883dda1e11db47671c4a3bbd9e",
      source: "http://lastplaceigotthisfrom.com/posts/yyyyy",
      origin: "http://whereitcamefrom.com/posts/zzzzz",
      description: "This post discusses stuff -- brief",
      contentType: "text/plain",
      content:
        "Þā wæs on burgum Bēowulf Scyldinga, lēof lēod-cyning, longe þrāge folcum gefrǣge (fæder ellor hwearf, aldor of earde), oð þæt him eft onwōc hēah Healfdene; hēold þenden lifde, gamol and gūð-rēow, glæde Scyldingas. Þǣm fēower bearn forð-gerīmed in worold wōcun, weoroda rǣswan, Heorogār and Hrōðgār and Hālga til; hȳrde ic, þat Elan cwēn Ongenþēowes wæs Heaðoscilfinges heals-gebedde. Þā wæs Hrōðgāre here-spēd gyfen, wīges weorð-mynd, þæt him his wine-māgas georne hȳrdon, oð þæt sēo geogoð gewēox, mago-driht micel. Him on mōd bearn, þæt heal-reced hātan wolde, medo-ærn micel men gewyrcean, þone yldo bearn ǣfre gefrūnon, and þǣr on innan eall gedǣlan geongum and ealdum, swylc him god sealde, būton folc-scare and feorum gumena. Þā ic wīde gefrægn weorc gebannan manigre mǣgðe geond þisne middan-geard, folc-stede frætwan. Him on fyrste gelomp ǣdre mid yldum, þæt hit wearð eal gearo, heal-ærna mǣst; scōp him Heort naman, sē þe his wordes geweald wīde hæfde. Hē bēot ne ālēh, bēagas dǣlde, sinc æt symle. Sele hlīfade hēah and horn-gēap: heaðo-wylma bād, lāðan līges; ne wæs hit lenge þā gēn þæt se ecg-hete āðum-swerian 85 æfter wæl-nīðe wæcnan scolde. Þā se ellen-gǣst earfoðlīce þrāge geþolode, sē þe in þȳstrum bād, þæt hē dōgora gehwām drēam gehȳrde hlūdne in healle; þǣr wæs hearpan swēg, swutol sang scopes. Sægde sē þe cūðe frum-sceaft fīra feorran reccan",
      author: {
        type: "author",
        id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
        host: "http://127.0.0.1:5454/",
        displayName: "Lara Croft",
        url: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
        github: "http://github.com/laracroft",
        profileImage: "https://i.imgur.com/k7XVwpB.jpeg",
      },
      categories: ["web", "tutorial"],
      comments:
        "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments",
      published: "2015-03-09T13:07:04+00:00",
      visibility: "FRIENDS",
      unlisted: false,
    },
    {
      type: "post",
      title: "DID YOU READ MY POST YET?",
      id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/999999983dda1e11db47671c4a3bbd9e",
      source: "http://lastplaceigotthisfrom.com/posts/yyyyy",
      origin: "http://whereitcamefrom.com/posts/zzzzz",
      description: "Whatever",
      contentType: "text/plain",
      content: "Are you even reading my posts Arjun?",
      author: {
        type: "author",
        id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
        host: "http://127.0.0.1:5454/",
        displayName: "Lara Croft",
        url: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
        github: "http://github.com/laracroft",
        profileImage: "https://i.imgur.com/k7XVwpB.jpeg",
      },
      categories: ["web", "tutorial"],
      comments:
        "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments",
      published: "2015-03-09T13:07:04+00:00",
      visibility: "FRIENDS",
      unlisted: false,
    },
    {
      "@context": "https://www.w3.org/ns/activitystreams",
      summary: "Lara Croft Likes your post",
      type: "Like",
      author: {
        type: "author",
        id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
        host: "http://127.0.0.1:5454/",
        displayName: "Lara Croft",
        url: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
        github: "http://github.com/laracroft",
        profileImage: "https://i.imgur.com/k7XVwpB.jpeg",
      },
      object:
        "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/764efa883dda1e11db47671c4a3bbd9e",
    },
    {
      type: "Follow",
      summary: "Greg wants to follow Lara",
      actor: {
        type: "author",
        id: "http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
        url: "http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
        host: "http://127.0.0.1:5454/",
        displayName: "Greg Johnson",
        github: "http://github.com/gjohnson",
        profileImage: "https://i.imgur.com/k7XVwpB.jpeg",
      },
      object: {
        type: "author",
        id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
        host: "http://127.0.0.1:5454/",
        displayName: "Lara Croft",
        url: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
        github: "http://github.com/laracroft",
        profileImage: "https://i.imgur.com/k7XVwpB.jpeg",
      },
    },
  ],
};

const useStyles = makeStyles(() => ({
  FollowItem: {
    padding: "2em",
  },
  LikeItem: {
    padding: "2em",
  },
}));

const Inbox = () => {
  const history = useHistory();

  const inboxList = tempInbox.items;

  const styleClasses = useStyles();
  const [InboxList1, setInboxList] = React.useState(inboxList);

  // 0 for post;
  // 1 for likes;
  // 2 for follow;
  const [InboxToggle, setInboxToggle] = React.useState(0);

  const [openPopup2, setOpenPopup2] = React.useState(false);
  const open_share = () => setOpenPopup2(true);

  const handleRemove = (e) => {
    const id = e.id;
    const newList = InboxList1.filter((item) => item.id !== id);
    setInboxList(newList);
  };

  const acceptFriendRequest = (id) => {};
  const declineFriendRequest = (id) => {};

  var listItems;
  if (InboxToggle === 0) {
    // Posts
    listItems = InboxList1.filter((item) => item.type === "post").map(
      (item) => (
        <Grid
          item
          xs={8}
          justifyContent="flex-start"
          alignItems="flex-start"
          backgroundColor="#fff"
          borderBottom="1.2px solid #f0f2f7"
          padding="30px"
          boxShadow="0 1px 3px rgb(18 18 18 / 10%)"
          marginLeft={20}
          marginRight={20}
        >
          <Grid item>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item>
                <Avatar src={item.author.profileImage}></Avatar>
              </Grid>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>
                      {item.author.displayName + " makes a new post."}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{item.published}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Typography variant="h5">{item.title}</Typography>
          </Grid>

          <Grid item spacing={2}>
            <Typography>{item.content}</Typography>
          </Grid>

          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Grid item>
              <IconButton edge="end" aria-label="thumbup">
                <ThumbUp />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton edge="end" aria-label="share" onClick={open_share}>
                <ShareRounded />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton edge="end" aria-label="comment">
                <Comment />
              </IconButton>
            </Grid>

            <Grid item>
              <IconButton
                edge="end"
                aria-label="Delete"
                onClick={() => handleRemove(item)}
              >
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      )
    );
  } else if (InboxToggle === 1) {
    // Likes
    listItems = InboxList1.filter((item) => item.type === "Like").map(
      (item) => (
        <Grid item>
          <Card>{item.summary}</Card>
        </Grid>
      )
    );
  } else if (InboxToggle === 2) {
    // Folows
    listItems = InboxList1.filter((item) => item.type === "Follow").map(
      (item) => (
        <Grid item>
          <Card>
            <Grid container direction="row" className={styleClasses.FollowItem}>
              <Grid item xs={10}>
                <Typography>{item.summary}</Typography>
              </Grid>
              <Grid item xs>
                <Fab
                  variant="extended"
                  color="primary"
                  onClick={acceptFriendRequest}
                >
                  accecpt
                </Fab>
                <Fab
                  variant="extended"
                  color="primary"
                  onClick={declineFriendRequest}
                >
                  decline
                </Fab>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      )
    );
  }

  return (
    <div>
      <Popup
        title={"Who do you want to share with?"}
        openPopup={openPopup2}
        setOpenPopup={setOpenPopup2}
      >
        <Share></Share>
      </Popup>
      <Grid container direction="row">
        <Grid item>
          <Fab
            variant="extended"
            color="primary"
            onClick={() => setInboxToggle(0)}
          >
            Posts
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            variant="extended"
            color="primary"
            onClick={() => setInboxToggle(1)}
          >
            <Typography>{"likes"}</Typography>
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            variant="extended"
            color="primary"
            onClick={() => setInboxToggle(2)}
          >
            <Typography>{"follow"}</Typography>
          </Fab>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={10}
        direction="column"
        alignSelf="right"
        marginTop={2}
      >
        {listItems}
      </Grid>
    </div>
  );
};

export default Inbox;
