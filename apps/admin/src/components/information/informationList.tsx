"use client";
import { Stack, Typography, IconButton, Button } from "@mui/material";
import { HiOutlineInformationCircle } from "react-icons/hi";
import React from "react";
import NextLink from "next/link";
import { gql } from "@/gql/__generated__";
import { useSuspenseQuery } from "@apollo/client/react/hooks";
import { Information } from "@/gql/__generated__/graphql";

const query = gql(`
query InformationList {
    Informations {
        id
        title
        content
    }
}
`);

export default function InformationList() {
  const { data } = useSuspenseQuery(query);

  const list = data.Informations.map((information: Information) => {
    return (
      <Button
        component={NextLink}
        href={`/information/${information.id}`}
        sx={{
          py: 1.5,
          px: 2,
          mb: 1,
          width: "100%",
          backgroundColor: "secondary.main",
          color: "text.primary",
        }}
        key={information.id}
      >
        <Stack
          spacing={1}
          direction={"row"}
          width={"100%"}
          justifyContent={"flex-start"}
          alignItems="center"
        >
          <IconButton sx={{ backgroundColor: "background.default" }}>
            <HiOutlineInformationCircle color={"text.primary"} />
          </IconButton>
          <Stack
            direction={"column"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            spacing={1}
          >
            <Typography
              color={"text.primary"}
              sx={{ fontSize: "14px", fontWeight: "bold" }}
              lineHeight={"1.2em"}
            >
              {information.title}
            </Typography>
            <Typography
              color={"text.primary"}
              sx={{ fontSize: "14px" }}
              lineHeight={"1.2em"}
            >
              {information.content}
            </Typography>
          </Stack>
        </Stack>
      </Button>
    );
  });
  return <>{list}</>;
}
