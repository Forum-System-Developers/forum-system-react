import { Card, CardContent, Typography } from "@mui/material";

const MessageCard = ({ className, message, author, timestamp }) => {
  return (
    <Card class={className} sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          gutterBottom
          sx={{
            color: "text.secondary",
            fontSize: 12,
            // left: "720px",
            padding: "1%",
          }}
        >
          [{timestamp}] {author}
        </Typography>
        <Typography variant="h6">{message}</Typography>
      </CardContent>
    </Card>
  );
};

export default MessageCard;
