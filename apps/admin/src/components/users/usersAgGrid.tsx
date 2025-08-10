'use client'
import React, {useEffect, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import {ColDef, ModuleRegistry, RowClickedEvent} from 'ag-grid-community';
import {ClientSideRowModelModule} from 'ag-grid-community';
import {User} from "@/src/models/UserModel";
import {Class} from '@/src/models/ClassModel';
import {Team} from "@/src/models/TeamModel";
import {useRouter} from "next/navigation";
import UserLinkRenderer from "@/components/users/userLinkRenderer";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export type UsersAgGridProps = {
    users: User[]
    classes: Class[]
    teams: Team[]
}

// Row Data Interface
type IRow = {
    userId: number;
    name: string;
    gender: string;
    emailAccountName: string;
    className: string;
    studentTeam: string;
}


// Create new GridExample component
const UsersAgGrid = (props: UsersAgGridProps) => {
    const height = 'calc(100vh - 230px)';
    const router = useRouter()
    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState<IRow[]>([])
    // Column Definitions: Defines & controls grid columns.
    const [colDefs,] = useState<ColDef<IRow>[]>([
        {
            field: "userId",
            headerName: "ユーザーID",
            cellRenderer: UserLinkRenderer,
        },
        {
            field: "name",
            headerName: "名前",
            filter: true,
        },
        {
            field: "emailAccountName",
            headerName: "メール名",
            filter: true,
        },
        {field: "gender", headerName: "性別"},
        {
            field: "className",
            headerName: "クラス",
            filter: true,
        },
        {field: "studentTeam", headerName: "チーム"},
    ]);

    useEffect(() => {
        const rows = props.users.map((user): IRow => {
            //  find class
            const classData = props.classes.find((c) => c.id === user.classId)
            //  find team and concat team names
            const teamData = props.teams.filter((t) => user.teamIds.includes(t.id))
            const teamNames = teamData.map((t) => t.name).join(", ")

            return {
                userId: user.id,
                name: user.name,
                className: classData?.name ?? "無所属",
                emailAccountName: user.email.split("@")[0],
                gender: user.gender == "male" ? "男子" : "女子",
                studentTeam: teamNames || "無所属",
            }
        })

        //  set row data
        setRowData(rows)
    }, [props.classes, props.teams, props.users])

    const handleRowClick = (e: RowClickedEvent<IRow>) => {
        const data = e.data

        //  ignore undefined
        if (!data) return

        //  redirect
        router.push(`/users/${data.userId}`)
    }

    // Container: Defines the grid's theme & dimensions.
    return (
        <div
            className={"ag-theme-quartz"}
            style={{
                width: '100%',
                height: height,
                borderRadius: "10px"
            }}
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                onRowClicked={handleRowClick}
                pagination={true}
                paginationAutoPageSize={true}
            />
        </div>
    );
}

export default UsersAgGrid;
