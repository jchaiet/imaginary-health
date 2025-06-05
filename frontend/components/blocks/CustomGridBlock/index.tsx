"use client";
import React, { useMemo, useState } from "react";
import { Grid } from "quirk-ui";
import { RichText } from "@/lib/portableTextRenderer";
import { CardGridBlockProps } from "@/types";
import styles from "./styles.module.css";
import { PortableTextBlock } from "next-sanity";

export function CustomGridBlock({
  titleOptions,
  description,
  columns,
  gap,
  autoFitMinMax,
  items,
  textReplaceOnHover = false,
}: CardGridBlockProps) {}
