import {
  Box,
  Drawer,
  IconButton,
  Typography,
  CircularProgress,
  Stack,
  Avatar,
  Paper,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface AppDetailsProps {
  loadingDetails: boolean;
  errorDetails: string | null;
  appDetails: any; // замените на реальный тип
  selectedAppId: string | null;
  handleCloseDrawer: () => void;
}

export default function AppDetailsDrawer({
  loadingDetails,
  errorDetails,
  appDetails,
  selectedAppId,
  handleCloseDrawer,
}: AppDetailsProps) {
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={Boolean(selectedAppId)}
      onClose={handleCloseDrawer}
      PaperProps={{
        sx: {
          width: 500,
          p: 2,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fafafa", // светло-серый фон
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          p: 1,
          backgroundColor: "#fff",
          borderRadius: 1,
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          App overview
        </Typography>
        <IconButton onClick={handleCloseDrawer}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {loadingDetails && (
          <Box textAlign="center" mt={2}>
            <CircularProgress />
          </Box>
        )}
        {errorDetails && (
          <Box textAlign="center" mt={2}>
            <Typography color="error">{errorDetails}</Typography>
          </Box>
        )}

        {appDetails && !loadingDetails && !errorDetails && (
          <>
            <Paper
              variant="outlined"
              sx={{
                borderRadius: 2,
                p: 2,
                mb: 2,
                backgroundColor: "#FFFFFF",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 2 }}
              >
                {appDetails.logo && (
                  <Avatar
                    alt={appDetails.name}
                    src={appDetails.logo}
                    sx={{ width: 32, height: 32 }}
                  />
                )}
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {appDetails.name}
                </Typography>
              </Stack>

              <InfoRow label="Category" value={appDetails.category} />
              <InfoRow label="Users" value={appDetails.users?.length ?? 0} />

              {appDetails.connector && (
                <InfoRow label="Connector" value={appDetails.connector.name} />
              )}

              <InfoRow
                label="Last classification"
                value={appDetails.lastClassification}
              />
            </Paper>

            {appDetails.users && (
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    color: "text.secondary",
                  }}
                >
                  Username
                </Typography>

                <Divider sx={{ mb: 1 }} />

                <Box sx={{ maxHeight: 500, overflowY: "auto" }}>
                  {appDetails.users.map((u: any) => (
                    <Stack
                      key={u.id}
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{
                        mb: 1,
                        p: 1,
                        borderRadius: 1,
                        transition: "background-color 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                        },
                      }}
                    >
                      {u.pic && (
                        <Avatar
                          src={u.pic}
                          alt={u.name}
                          sx={{ width: 24, height: 24 }}
                        />
                      )}
                      <Typography variant="body2">{u.name}</Typography>
                    </Stack>
                  ))}
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>
    </Drawer>
  );
}

function InfoRow({ label, value }: { label: string; value: any }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography
        variant="body2"
        sx={{ fontWeight: 500, color: "text.secondary" }}
      >
        {label}:{" "}
        <Typography component="span" variant="body2" sx={{ fontWeight: 400 }}>
          {value}
        </Typography>
      </Typography>
    </Box>
  );
}
