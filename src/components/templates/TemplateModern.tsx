import React from 'react';
import styled from 'styled-components';
import { CVData } from '@/types/cv';

const Page = styled.div`
  display: flex;
  height: 100%;
  min-height: 297mm;
  font-family: 'Open Sans', sans-serif;
`;

const Sidebar = styled.div<{ $color: string }>`
  width: 30%;
  background-color: ${({ $color }) => $color};
  color: white;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Main = styled.div`
  width: 70%;
  padding: 40px 30px;
  background: white;
`;

const Name = styled.h1<{ $color: string }>`
  font-size: 32px;
  font-weight: 800;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  margin-bottom: 5px;
  line-height: 1.1;
`;

const JobTitle = styled.h2`
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  border-bottom: 2px solid #eee;
  padding-bottom: 5px;
  margin-bottom: 15px;
  color: #333;
`;

const SidebarTitle = styled(SectionTitle)`
  color: white;
  border-color: rgba(255,255,255,0.3);
`;

const ContactItem = styled.div`
  font-size: 12px;
  margin-bottom: 8px;
  word-break: break-word;
`;

const SkillItem = styled.div`
  margin-bottom: 8px;
`;

const SkillName = styled.div`
  font-size: 12px;
  margin-bottom: 3px;
`;

const ProgressBar = styled.div`
  background: rgba(255,255,255,0.2);
  height: 4px;
  border-radius: 2px;
`;

const ProgressFill = styled.div<{ width: string }>`
  background: white;
  height: 100%;
  width: ${({ width }) => width};
  border-radius: 2px;
`;

const ExperienceItem = styled.div`
  margin-bottom: 20px;
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const Role = styled.div`
  font-weight: 700;
  font-size: 14px;
`;

const DateLoc = styled.div`
  font-size: 12px;
  color: #666;
`;

const Company = styled.div`
  font-weight: 600;
  font-size: 13px;
  color: #444;
  margin-bottom: 8px;
`;

const Description = styled.div`
  font-size: 12px;
  color: #555;
  line-height: 1.5;
  
  ul {
    padding-left: 15px;
    margin: 5px 0;
  }
`;

export default function TemplateModern({ data }: { data: CVData }) {
  const { personalInfo, experience, education, skills, summary, colorScheme } = data;

  const getSkillWidth = (level: string) => {
    switch (level) {
      case 'expert': return '100%';
      case 'advanced': return '75%';
      case 'intermediate': return '50%';
      default: return '25%';
    }
  };

  return (
    <Page>
      <Sidebar $color={colorScheme}>
        <div>
          <SidebarTitle>Contact</SidebarTitle>
          {personalInfo.email && <ContactItem>{personalInfo.email}</ContactItem>}
          {personalInfo.phone && <ContactItem>{personalInfo.phone}</ContactItem>}
          {personalInfo.city && <ContactItem>{personalInfo.city}, {personalInfo.country}</ContactItem>}
          {personalInfo.linkedin && <ContactItem>LinkedIn</ContactItem>}
        </div>

        {skills.length > 0 && (
          <div>
            <SidebarTitle>Skills</SidebarTitle>
            {skills.map(skill => (
              <SkillItem key={skill.id}>
                <SkillName>{skill.name}</SkillName>
                <ProgressBar>
                  <ProgressFill width={getSkillWidth(skill.level)} />
                </ProgressBar>
              </SkillItem>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div>
            <SidebarTitle>Education</SidebarTitle>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: 15 }}>
                <div style={{ fontWeight: 'bold', fontSize: 13 }}>{edu.degree}</div>
                <div style={{ fontSize: 12 }}>{edu.school}</div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>{edu.startDate} - {edu.endDate}</div>
              </div>
            ))}
          </div>
        )}
      </Sidebar>

      <Main>
        <div style={{ marginBottom: 40 }}>
          <Name $color={colorScheme}>{personalInfo.firstName} {personalInfo.lastName}</Name>
          <JobTitle>{personalInfo.jobTitle}</JobTitle>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: '#444' }}>{summary}</p>
        </div>

        <SectionTitle>Experience</SectionTitle>
        {experience.map(exp => (
          <ExperienceItem key={exp.id}>
            <JobHeader>
              <Role>{exp.jobTitle}</Role>
              <DateLoc>{exp.startDate} - {exp.endDate || 'Present'}</DateLoc>
            </JobHeader>
            <Company>{exp.company} | {exp.city}</Company>
            <Description>
              {exp.description && <p>{exp.description}</p>}
              <ul>
                {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </Description>
          </ExperienceItem>
        ))}
      </Main>
    </Page>
  );
}
