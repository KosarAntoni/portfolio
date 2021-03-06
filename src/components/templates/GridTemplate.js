import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import ProjectCard from '../organisms/ProjectCard';
import SkillsCard from '../molecules/SkillsCard/SkillsCard';
import AuthorCard from '../molecules/AuthorCard/AuthorCard';
import ContactCard from '../molecules/ContactCard/ContactCard';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  
  width: 100%;
  padding: 0 1.5rem;
  margin: 2rem 0;

  @media screen and (min-width: ${({ theme }) => theme.viewPorts.viewport7}px) {
    padding: 0 4.5rem;
  }
`;

const Grid = styled.div`
  max-width: 1170px;
  width: 100%;

  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  
  @media screen and (min-width: ${({ theme }) => theme.viewPorts.viewport4}px) {
    grid-template-columns: 1fr 1fr;
  }  
  
  @media screen and (min-width: ${({ theme }) => theme.viewPorts.viewport7}px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (min-width: ${({ theme }) => theme.viewPorts.viewport12}px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const ItemWrapper = styled.div`
  @media screen and (min-width: ${({ theme }) => theme.viewPorts.viewport4}px) {
    :nth-child(1) {
      grid-area: 1 / 1 / 3 / 2;
    }
    
    :nth-child(4) {
      grid-column-end: span 2;
    }
  } 
  
  @media screen and (min-width: ${({ theme }) => theme.viewPorts.viewport7}px) {
    :nth-child(6) {
      grid-column-end: span 2;
    }
    
    :nth-child(7) {
      grid-column-end: span 2;
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.viewPorts.viewport12}px) {
    :nth-child(3) {
      grid-column-end: span 2;   
    }
    
    :nth-child(7) {
      grid-area: auto;
    }
  };
`;

const GridTemplate = ({ projects, skills }) => {
  const match = useRouteMatch('/:id');

  return (
    <Wrapper>
      <Grid>
        <ItemWrapper>
          <SkillsCard skills={skills} />
        </ItemWrapper>
        {projects.map((item, index) => (
          <ItemWrapper
            key={item.id}
            id={index === 0 && 'projects'}
          >
            <ProjectCard
              id={item.id}
              content={item.content}
              technologies={item.technologies}
              title={item.title}
              images={item.images}
              links={item.links}
              background={item.background}
              isSelected={match && match.params.id === item.id.toString()}
            />
          </ItemWrapper>
        ))}
        <ItemWrapper>
          <ContactCard />
        </ItemWrapper>
        <ItemWrapper>
          <AuthorCard />
        </ItemWrapper>
      </Grid>
    </Wrapper>
  );
};

GridTemplate.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.objectOf(PropTypes.string),
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(
          PropTypes.objectOf(PropTypes.string),
        ),
      ]),
    ),
  ).isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GridTemplate;
