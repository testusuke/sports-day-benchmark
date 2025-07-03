"use client";

import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  Grid,
  Paper,
} from "@mui/material";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

const CREATE_TEAM = gql`
  mutation CreateTeam($input: CreateTeamInput!) {
    createTeam(input: $input) {
      id
      name
      users {
        id
        name
        email
      }
    }
  }
`;

const ADD_TEAM_MEMBERS = gql`
  mutation AddTeamMembers($userIds: [ID!]!, $teamId: ID!) {
    addTeamMember(userIds: $userIds, teamId: $teamId) {
      id
      name
      users {
        id
        name
        email
      }
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_USERS);
  const [createTeam] = useMutation(CREATE_TEAM);
  const [addTeamMembers] = useMutation(ADD_TEAM_MEMBERS);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [teamName, setTeamName] = useState("");

  const handleAddMember = (user: User) => {
    if (
      selectedMembers.length < 5 &&
      !selectedMembers.find((m) => m.id === user.id)
    ) {
      setSelectedMembers([...selectedMembers, user]);
    }
  };

  const handleRemoveMember = (userId: string) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== userId));
  };

  const handleCreateTeam = async () => {
    if (selectedMembers.length === 0 || !teamName.trim()) {
      alert("チーム名とメンバーを選択してください");
      return;
    }

    try {
      // チームを作成
      const teamResult = await createTeam({
        variables: {
          input: {
            name: teamName,
            groupId: null,
          },
        },
      });

      const teamId = teamResult.data.createTeam.id;
      const userIds = selectedMembers.map((member) => member.id);

      // チームメンバーを追加
      await addTeamMembers({
        variables: {
          userIds: userIds,
          teamId: teamId,
        },
      });

      console.log("チーム作成・メンバー追加成功:", teamResult.data.createTeam);
      alert("チームが作成され、メンバーが追加されました！");

      // フォームをリセット
      setSelectedMembers([]);
      setTeamName("");
    } catch (err) {
      console.error("チーム作成エラー:", err);
      alert("チーム作成に失敗しました");
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          ユーザー読み込みエラー: {error.message}
        </Alert>
        <Button variant="contained" onClick={() => window.location.reload()}>
          再試行
        </Button>
      </Container>
    );
  }

  const availableUsers =
    data?.users?.filter(
      (user: User) => !selectedMembers.find((m) => m.id === user.id)
    ) || [];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={4}>
        <Box textAlign="center">
          <Typography variant="h3" component="h1" gutterBottom fontWeight="300">
            チーム編成
          </Typography>
          <Typography variant="h6" color="text.secondary" fontWeight="400">
            最大5名までチームメンバーを選択できます
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* 左側: チームメンバー選択エリア */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{ height: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom fontWeight="500">
                  チームメンバー ({selectedMembers.length}/5)
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    チーム名
                  </Typography>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="チーム名を入力"
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "16px",
                    }}
                  />
                </Box>

                <Paper
                  variant="outlined"
                  sx={{
                    minHeight: "300px",
                    p: 2,
                    backgroundColor:
                      selectedMembers.length === 0 ? "#f5f5f5" : "white",
                  }}
                >
                  {selectedMembers.length === 0 ? (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      minHeight="250px"
                    >
                      <Typography variant="body1" color="text.secondary">
                        ユーザーを選択してください
                      </Typography>
                    </Box>
                  ) : (
                    <List>
                      {selectedMembers.map((member, index) => (
                        <ListItem
                          key={member.id}
                          sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 1,
                            mb: 1,
                            backgroundColor: "background.paper",
                          }}
                          secondaryAction={
                            <Button
                              size="small"
                              color="error"
                              onClick={() => handleRemoveMember(member.id)}
                            >
                              削除
                            </Button>
                          }
                        >
                          <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
                            {member.name.charAt(0).toUpperCase()}
                          </Avatar>
                          <ListItemText
                            primary={member.name}
                            secondary={member.email}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Paper>

                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleCreateTeam}
                    disabled={selectedMembers.length === 0 || !teamName.trim()}
                    sx={{ py: 1.5 }}
                  >
                    チーム作成
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* 右側: ユーザー一覧 */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{ height: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom fontWeight="500">
                  利用可能なユーザー ({availableUsers.length})
                </Typography>

                <Paper
                  variant="outlined"
                  sx={{ maxHeight: "400px", overflow: "auto" }}
                >
                  {availableUsers.length === 0 ? (
                    <Box textAlign="center" py={4}>
                      <Typography variant="body1" color="text.secondary">
                        すべてのユーザーが選択済みです
                      </Typography>
                    </Box>
                  ) : (
                    <List>
                      {availableUsers.map((user: User) => (
                        <ListItem
                          key={user.id}
                          sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 1,
                            mb: 1,
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "action.hover",
                            },
                          }}
                          onClick={() => handleAddMember(user)}
                        >
                          <Avatar sx={{ mr: 2, bgcolor: "secondary.main" }}>
                            {user.name.charAt(0).toUpperCase()}
                          </Avatar>
                          <ListItemText
                            primary={user.name}
                            secondary={user.email}
                          />
                          <Chip
                            label="追加"
                            color="primary"
                            size="small"
                            variant="outlined"
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box
          sx={{ mt: 4, pt: 4, borderTop: "1px solid", borderColor: "divider" }}
        >
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Built with Next.js, Material-UI and Apollo GraphQL
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}
