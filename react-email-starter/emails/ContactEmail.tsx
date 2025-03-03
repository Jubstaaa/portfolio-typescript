// emails/ContactEmail.tsx
import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
} from "@react-email/components";

type ContactEmailProps = {
  name: string;
  email: string;
  description: string;
};

export default function ContactEmail({
  name,
  email,
  description,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Contact Form Submission</Preview>
      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f4f4f4",
          padding: "20px",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <Heading style={{ color: "#333" }}>
            New Contact Form Submission
          </Heading>
          <Text>
            <strong>Name:</strong> {name}
          </Text>
          <Text>
            <strong>Email:</strong> {email}
          </Text>
          <Text>
            <strong>Description:</strong> {description}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
