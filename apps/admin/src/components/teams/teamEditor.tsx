'use client'
import {
    Box,
    Button,
    FormControl, InputLabel, Paper,
    Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
    Typography
} from "@mui/material";
import {HiCheck, HiMiniTrash, HiPlus} from "react-icons/hi2";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {Team, teamFactory} from "@/src/models/TeamModel";
import {Class} from "@/src/models/ClassModel";
import {User} from "@/src/models/UserModel";
import TeamDelete from "@/components/teams/teamDelete";
import AddTeamMemberDialog from "@/components/teams/addTeamMemberDialog";

type TeamEditorProps = {
    class: Class;
    team: Team;
    teamUser: User[];
    classUsers: User[];
}

export default function TeamEditor(props: TeamEditorProps) {
    const router = useRouter()
    const [teamName, setTeamName] = useState<string>(props.team.name)
    const [isOpenTeamMemberAddDialog, setIsOpenTeamMemberAddDialog] = useState<boolean>(false)

    const handleSubmit = async () => {
        await teamFactory().update(props.team.id, {
            name: teamName,
            description: props.team.description,
            classId: props.team.classId,
            teamTagId: props.team.teamTagId
        })

        router.push('/teams')
        router.refresh()

    }

    const removeUser = async (userId: number) => {
        await teamFactory().removeTeamUser(props.team.id, userId)
        //  refresh
        router.refresh()
    }

    const notTeamUsers = props.classUsers.filter((user) => {
        return !props.teamUser.some((teamUser) => teamUser.id === user.id)
    })

    return (
        <>
            <Stack mx={0} my={2} spacing={2} direction={"column"}>
                <Stack
                    direction={"row"}
                    spacing={2}
                    alignItems={"center"}
                >
                    <FormControl fullWidth>
                        <TextField
                            label="チーム名"
                            id="change-team-name"
                            InputLabelProps={{shrink: true}}
                            defaultValue={props.team.name}
                            value={teamName}
                            onChange={(t) => {
                                setTeamName(t.target.value)
                            }}
                        />
                    </FormControl>
                </Stack>

                <FormControl fullWidth>
                    <Paper variant="outlined" sx={{
                        p: 2,
                        minWidth: 'fit-content',
                        position: 'relative',
                        border: '1px solid #adafbd',
                        display: 'inline-block'
                    }}>
                        <InputLabel
                            id="class-select-label"
                            variant="standard"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: -8,
                                bgcolor: 'background.paper',
                                px: 1,
                                transform: 'translate(14px, -8px) scale(1)',
                                fontSize: '12px'
                            }}
                        >
                            所属クラス
                        </InputLabel>
                        <Typography variant="body1">
                            {props.class.name}
                        </Typography>
                    </Paper>
                </FormControl>

                <FormControl fullWidth>
                    <Box sx={{position: 'relative'}}>
                        <InputLabel sx={{
                            position: 'absolute',
                            top: '-24px',
                            left: '-6px',
                            bgcolor: 'background.paper',
                            px: 1,
                            fontSize: '12px'
                        }}>
                            チームメンバー
                        </InputLabel>
                    </Box>
                    <TableContainer
                        component={Paper}
                        elevation={0}
                        sx={{border: '1px solid #adafbd'}}
                    >
                        <Table>
                            <TableHead sx={{borderBottom: '1px solid #adafbd'}}>
                                <TableRow>
                                    <TableCell sx={{border: 0}}>学籍番号</TableCell>
                                    <TableCell sx={{border: 0}}>名前</TableCell>
                                    <TableCell sx={{border: 0}}>性別</TableCell>
                                    <TableCell sx={{border: 0}}>削除</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.teamUser.map((member) => {
                                    return (
                                        <TableRow key={member.id}>
                                            <TableCell sx={{border: 0}}>{member.id}</TableCell>
                                            <TableCell sx={{border: 0}}>{member.name}</TableCell>
                                            <TableCell sx={{border: 0}}>
                                                <Typography
                                                    sx={{color: member.gender === "female" ? "red" : "inherit"}}
                                                >
                                                    {member.gender === "male" ? "男性" : "女性"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                sx={{border: 0}}
                                            >
                                                <Button
                                                    color={"error"}
                                                    startIcon={<HiMiniTrash/>}
                                                    onClick={() => removeUser(member.id)}
                                                >
                                                    削除
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </FormControl>

                <AddTeamMemberDialog
                    isOpen={isOpenTeamMemberAddDialog}
                    setClose={() => {
                        setIsOpenTeamMemberAddDialog(false)
                    }}
                    team={props.team}
                    users={notTeamUsers}
                />

                <Button
                    variant={"contained"}
                    color={"primary"}
                    sx={{flexGrow: 3}}
                    startIcon={<HiPlus/>}
                    onClick={() => {
                        setIsOpenTeamMemberAddDialog(true)
                    }}
                >
                    チームメンバー追加
                </Button>

                <Stack
                    direction={"row"}
                    my={0.5}
                    spacing={1}
                    width={"100%"}
                    justifyContent={"space-between"}
                    alignItems="center"
                >
                    <TeamDelete teamId={props.team.id}/>
                    <Button
                        variant={"contained"}
                        color={"info"}
                        sx={{flexGrow: 3}}
                        startIcon={<HiCheck/>}
                        onClick={handleSubmit}
                    >
                        保存
                    </Button>
                </Stack>
            </Stack>
        </>
    )
}