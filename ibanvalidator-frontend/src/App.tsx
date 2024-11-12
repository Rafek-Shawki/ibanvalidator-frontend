import React, {useEffect, useState} from 'react';
import {ibanValidationAPI} from './services/IbanValidationService';
import {
	Box,
	Button,
	CircularProgress,
	createTheme,
	IconButton,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
	ThemeProvider,
	Tooltip,
	Typography,
} from '@mui/material';
import {toastError, toastSuccess} from './services/ToastService';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useTranslation} from 'react-i18next';
import './localization/i18n';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {IValidationResult} from "./models/IValidationResult.ts";

const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#1976d2',
		},
		background: {
			default: '#f9f9f9',
		},
		text: {
			primary: '#333',
		},
	},
});

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#90caf9',
		},
		background: {
			default: '#121212',
			paper: '#1e1e1e',
		},
		text: {
			primary: '#ffffff',
		},
	},
});

function App() {
	const [iban, setIban] = useState<string>('');
	const [isLightTheme, setIsLightTheme] = useState(true);
	const [validationRes, setValidationRes] = useState<IValidationResult | null>(null);
	const {t, i18n} = useTranslation();

	const [triggerValidation, {data: responseData, isSuccess, error, isLoading}] =
			ibanValidationAPI.endpoints.validateIban.useLazyQuery();

	useEffect(() => {
		if (isSuccess && responseData) {
			// @ts-ignore
			const result = responseData?.data?.validationResult;

			setValidationRes(result);

			if (result?.isValid) {
				toastSuccess(t("ibanValid"));
			} else {

				if (result?.invalidityCode === 1) {
					toastError(t("ibanInvalid") + t("invalidityCode1"));
				} else {
					if (result?.invalidityCode === 2) {
						toastError(t("invalidityCode2"));
					}
				}
			}
		}
	}, [isSuccess, responseData, t]);

	useEffect(() => {
		if (error) {
			toastError(t("ibanValidationFailed"));
		}
	}, [error, t]);

	const handleIbanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIban(e.target.value);
	};

	const handleVerifyClick = () => {
		if (iban.trim()) {
			triggerValidation({iban});
		} else {
			toastError(t("pleaseEnterIban"));
		}
	};

	const toggleTheme = () => {
		setIsLightTheme(!isLightTheme);
	};

	const handleLanguageChange = (event: SelectChangeEvent<string>) => {
		const language = event.target.value as string;
		i18n?.changeLanguage(language);
	};

	return (
			<ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
				<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
						minHeight="100vh"
						width="100vw"
						bgcolor="background.default"
				>
					<Box
							display="flex"
							flexDirection="column"
							alignItems="center"
							justifyContent="center"
							maxWidth={800}
							width="100%"
							p={3}
							boxShadow={3}
							borderRadius={2}
							bgcolor="background.paper"
					>
						<ToastContainer theme={isLightTheme ? "light" : "dark"}/>

						<Box display="flex" justifyContent="space-between" width="100%" maxWidth={400} mb={2}>
							<Tooltip
									title={<span style={{fontWeight: 'bold'}}>{t("language")}</span>}
									placement="top"
							>
								<Select
										value={i18n?.language}
										onChange={handleLanguageChange}
										variant="outlined"
										sx={{minWidth: 100}}
								>
									<MenuItem value="en">English</MenuItem>
									<MenuItem value="de">Deutsch</MenuItem>
								</Select>
							</Tooltip>

							<Tooltip
									title={<span style={{fontWeight: 'bold'}}>{t("theme")}</span>}
									placement="top"
							>
								<IconButton onClick={toggleTheme} color="inherit">
									{isLightTheme ? <DarkModeIcon sx={{color: 'purple'}}/> :
											<LightModeIcon sx={{color: 'yellow'}}/>}
								</IconButton>
							</Tooltip>
						</Box>

						<Typography variant="h4" gutterBottom color="text.primary" textAlign="center">
							{t("welcome")}
						</Typography>
						<Typography variant="body1" mb={2} color="text.primary" textAlign="center">
							{t("instruction")}
						</Typography>

						<Box display="flex" alignItems="center" mb={3} flexDirection="column" width="100%">
							<TextField
									label={t("ibanLabel")}
									variant="outlined"
									value={iban}
									onChange={handleIbanChange}
									fullWidth
									sx={{
										maxWidth: 400,
										mb: 2,
									}}
							/>
							<Button
									variant="contained"
									color="primary"
									onClick={handleVerifyClick}
									disabled={isLoading || iban.trim() === ""}
									sx={{width: "100%", maxWidth: 200}}
							>
								{isLoading ? <CircularProgress size={24} color="inherit"/> : t("verify")}
							</Button>
						</Box>

						{validationRes && (
								<Box mt={3} p={2} width="100%" maxWidth={500} textAlign="left" borderRadius={1}
									 boxShadow={3} bgcolor="background.paper">
									<Typography variant="h4" color="text.primary" gutterBottom>
										{t("validationResult")}
									</Typography>

									{validationRes?.iban && (
											<Box display="flex" justifyContent="space-between" mb={1}>
												<Typography color="text.primary" fontWeight="bold">
													{t("iban")}:
												</Typography>
												<Typography color="text.primary">{validationRes?.iban}</Typography>
											</Box>
									)}

									{validationRes?.isValid !== undefined && (
											<Box display="flex" justifyContent="space-between" mb={1}>
												<Typography color="text.primary" fontWeight="bold">
													{t("valid")}:
												</Typography>
												<Typography
														color="text.primary">{validationRes?.isValid ? t("yes") : t("no")}</Typography>
											</Box>
									)}

									{validationRes?.invalidityCode !== 0 && (
											<Box display="flex" justifyContent="space-between" mb={1}>
												<Typography color="text.primary" fontWeight="bold">
													{t("validReason")}:
												</Typography>
												<Typography color="text.primary">
													{validationRes?.invalidityCode === 1 ? t("invalidityCode1") : t("invalidityCode2")}
												</Typography>
											</Box>
									)}

									{validationRes?.accountNumber && (
											<Box display="flex" justifyContent="space-between" mb={1}>
												<Typography color="text.primary" fontWeight="bold">
													{t("accountNumber")}:
												</Typography>
												<Typography
														color="text.primary">{validationRes?.accountNumber}</Typography>
											</Box>
									)}

									{validationRes?.bankInfoDTO?.bankName && (
											<Box display="flex" justifyContent="space-between" mb={1}>
												<Typography color="text.primary" fontWeight="bold">
													{t("bankName")}:
												</Typography>
												<Typography
														color="text.primary">{validationRes?.bankInfoDTO.bankName}</Typography>
											</Box>
									)}

									{validationRes?.bankInfoDTO?.bankNumber && (
											<Box display="flex" justifyContent="space-between" mb={1}>
												<Typography color="text.primary" fontWeight="bold">
													{t("bankNumber")}:
												</Typography>
												<Typography
														color="text.primary">{validationRes?.bankInfoDTO.bankNumber}</Typography>
											</Box>
									)}

									{validationRes?.bankInfoDTO?.bic && (
											<Box display="flex" justifyContent="space-between" mb={1}>
												<Typography color="text.primary" fontWeight="bold">
													{t("bic")}:
												</Typography>
												<Typography
														color="text.primary">{validationRes?.bankInfoDTO.bic}</Typography>
											</Box>
									)}
								</Box>
						)}
					</Box>
				</Box>
			</ThemeProvider>
	);
}

export default App;
