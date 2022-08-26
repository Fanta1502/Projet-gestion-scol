package com.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.backend.payload.request.SearchRequest;
import com.backend.payload.request.SearchRequestUtil;
import com.backend.payload.response.PageResponse;
import com.backend.persistence.dao.EleveDAO;
import com.backend.persistence.dto.EleveDto;
import com.backend.persistence.entities.Eleve;
import com.backend.persistence.mappers.EleveMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class EleveService {
	private final EleveDAO eleveDAO;
	private final EleveMapper eleveMapper;
	
	public PageResponse<EleveDto> all(final SearchRequest request)
	{
		try {
			Page<Eleve> eleves = eleveDAO.findAll(SearchRequestUtil.toPageRequest(request));
			log.info("ELeve response successfully");
			return new PageResponse<EleveDto>(eleveMapper.fromEntitiesToDtoList(eleves.getContent()), eleves.getSize(),eleves.getTotalElements());
		} catch (Exception e) {
			log.error("There was an error while getting eleve", e);
			return null;
		}		
	}
	public EleveDto add(EleveDto eleveDto) {
		try {
			Eleve eleve = eleveMapper.fromDtoToEntity(eleveDto);
			eleve = this.eleveDAO.saveAndFlush(eleve);
			log.info("Eleve with id= {} saved successfully", eleve.getId());
			return eleveMapper.fromEntityToDto(eleve);
		} catch (Exception e) {
			log.error("Cannot add eleve ", e);
			return null;
		}
	}
}
