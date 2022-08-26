package com.backend.service;


import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.payload.request.LoginRequest;
import com.backend.payload.response.JwtResponse;
import com.backend.persistence.Constants.Constants;
import com.backend.persistence.dao.UtilisateurDAO;
import com.backend.persistence.dto.UtilisateurDto;
import com.backend.persistence.entities.Utilisateur;
import com.backend.persistence.mappers.UtilisateurMapper;
import com.backend.security.jwt.JwtUtils;
import com.backend.security.services.UserDetailsImpl;
import com.backend.security.services.UserDetailsServiceImpl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class AuthService {
	@Value("${gestionScol.frontendUrl}")
	private String frontendUrl;
	private final AuthenticationManager authenticationManager;

	private final UtilisateurDAO userRepository;
	private final UtilisateurMapper userMapper;

	private final UserDetailsServiceImpl userDetailsServiceImpl;
	private final JwtUtils jwtUtils;
	private final PasswordEncoder passwordEncoder;

	@Autowired
	public AuthService(AuthenticationManager authenticationManager, UtilisateurDAO userRepository,
			UtilisateurMapper userMapper, UserDetailsServiceImpl userDetailsServiceImpl,
			JwtUtils jwtUtils, PasswordEncoder passwordEncoder) {
		super();
		this.authenticationManager = authenticationManager;
		this.userRepository = userRepository;
		this.userMapper = userMapper;
		this.userDetailsServiceImpl = userDetailsServiceImpl;
		this.jwtUtils = jwtUtils;
		this.passwordEncoder = passwordEncoder;
	}

	public JwtResponse login(LoginRequest loginRequest) {
		Authentication authentication =null;
		try {
			try {
				 authentication = authenticationManager.authenticate(
						new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
			} catch (BadCredentialsException e) {
				return null;
			}
			SecurityContextHolder.getContext().setAuthentication(authentication);
			UserDetailsImpl userDetails = (UserDetailsImpl) userDetailsServiceImpl
					.loadUserByUsername(loginRequest.getUsername());

			String jwt = jwtUtils.generateJwtToken(userDetails);
			List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
					.collect(Collectors.toList());
			JwtResponse newJwtResponse = new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(),
					userDetails.getEmail(), roles);
			log.info("User {} successfuly connected", loginRequest.getUsername());
			return newJwtResponse;
		} catch (Exception e) {
			log.error("User cannot be authenticated", e);
		}
		return null;

	}

	public UtilisateurDto editUserSettings(UtilisateurDto userBody) {
		try {
			Utilisateur user = userRepository.findOneById(userBody.getId());
			user.setNom(userBody.getNom());
			user.setPrenom(userBody.getPrenom());
			user.setProfilPicture(userBody.getProfilPicture());
			user.setEmail(userBody.getEmail());
			userRepository.saveAndFlush(user);
			UtilisateurDto userDto = userMapper.fromEntityToDto(user);
			log.info("User (id={}) updated successfully", user.getId());
			return userDto;
		} catch (Exception e) {
			log.error("An error occured while updating user ", e);
			return null;
		}

	}

	public UtilisateurDto getUser(Long id) {
		try {
			Utilisateur user = userRepository.findOneById(id);
			UtilisateurDto userDto = userMapper.fromEntityToDto(user);
			log.info("User response successfully");
			return userDto;
		} catch (Exception e) {
			log.error("There was an error while getting user", e);
			return null;
		}

	}

	public UtilisateurDto getUser(String mail) {
		try {
			Optional<Utilisateur> user = userRepository.findByEmail(mail);
			UtilisateurDto userDto = userMapper.fromEntityToDto(user.get());
			log.info("User response successfully");
			return userDto;
		} catch (Exception e) {
			log.error("There was an error while getting user", e);
			return null;
		}

	}

	public UtilisateurDto registerUser(Utilisateur user) {
		try {
			String role = Constants.Role.ROLE_CLIENT;
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			user.setRole(role);
			userRepository.save(user);
			UtilisateurDto userDto = userMapper.fromEntityToDto(user);
			log.info("User added successfully");
			return userDto;
		} catch (Exception e) {
			log.error("There was an error while posting user {}", user.getId(), e);
			return null;
		}
	}
	public UtilisateurDto forgotPassword(String email) {
		try {
			Utilisateur user = userRepository.findOneByEmail(email);
			int leftLimit = 48;
			int rightLimit = 122;
			int targetStringLength = 16;
			Random random = new Random();

			String generatedString = random.ints(leftLimit, rightLimit + 1)
					.filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97)).limit(targetStringLength)
					.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append).toString();
			userRepository.saveAndFlush(user);
			log.info("Forgot password mail sended successfully");
			return userMapper.fromEntityToDto(user);

		} catch (Exception e) {
			log.error("An error occured while getting user {}", e);

			return null;

		}
	}
}
