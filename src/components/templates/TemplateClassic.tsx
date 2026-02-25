import React from 'react';
import styled from 'styled-components';
import { CVData } from '@/types/cv';

const Page = styled.div`
  padding: 40px 50px;
  background: white;
  min-height: 297mm;
  font-family: 'Times New Roman', serif;
  color: #333;
`;

const Header = styled.div`
  text-align: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
  margin-bottom: 30px;
`;

const Name = styled.h1`
  font-size: 36px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
`;

const ContactInfo = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
`;

const Section = styled.div`
  margin-bottom: 25px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  text-transform: uppercase;
  border-bottom: 1px solid #000;
  padding-bottom: 5px;
  margin-bottom: 15px;
  font-weight: bold;
  letter-spacing: 1px;
`;

const JobItem = styled.div`
  margin-bottom: 15px;
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 15px;
`;

const Company = styled.div`
  font-style: italic;
  font-size: 14px;
  margin-bottom: 5px;
`;

const Bullets = styled.ul`
  margin: 0;
  padding-left: 20px;
  font-size: 14px;
  line-height: 1.4;
`;

export default function TemplateClassic({ data }: { data: CVData }) {
  const { personalInfo, experience, education, skills, summary } = data;

  return (
    <Page>
      <Header>
        <Name>{personalInfo.firstName} {personalInfo.lastName}</Name>
        <ContactInfo>
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <span>{personalInfo.city}, {personalInfo.country}</span>
        </ContactInfo>
      </Header>

      {summary && (
        <Section>
          <SectionTitle>Professional Summary</SectionTitle>
          <p style={{ fontSize: 14, lineHeight: 1.5 }}>{summary}</p>
        </Section>
      )}

      <Section>
        <SectionTitle>Experience</SectionTitle>
        {experience.map(exp => (
          <JobItem key={exp.id}>
            <JobHeader>
              <span>{exp.jobTitle}</span>
              <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
            </JobHeader>
            <Company>{exp.company}, {exp.city}</Company>
            <Bullets>
              {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </Bullets>
          </JobItem>
        ))}
      </Section>

      <Section>
        <SectionTitle>Education</SectionTitle>
        {education.map(edu => (
          <JobItem key={edu.id}>
            <JobHeader>
              <span>{edu.school}</span>
              <span>{edu.startDate} - {edu.endDate}</span>
            </JobHeader>
            <Company>{edu.degree}</Company>
          </JobItem>
        ))}
      </Section>

      {skills.length > 0 && (
        <Section>
          <SectionTitle>Skills</SectionTitle>
          <p style={{ fontSize: 14 }}>
            {skills.map(s => s.name).join(' • ')}
          </p>
        </Section>
      )}
    </Page>
  );
}
