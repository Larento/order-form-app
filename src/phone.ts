const COUNTRY_CODE = '7';
const ALTERNATIVE_CODE = '8';
const DIGIT_PLACEHOLDER = '_';

const REGEX = {
	anyFirst: /^./,
	startsWithCountryCode: new RegExp(
		`^\\+?${COUNTRY_CODE}|^${ALTERNATIVE_CODE}`
	),
	isDigit: /\d/g,
	lastDigit: /(\d)(?!.*\d)/,
	digitPlaceholder: new RegExp(`${DIGIT_PLACEHOLDER}`, 'g'),
	allowedChars: /\s|\(|\)|\-/g,
};

const formatStr = makeFormatString([
	`+${COUNTRY_CODE} `,
	`(${digits(3)}) `,
	`${digits(3)}-`,
	`${digits(2)}-`,
	`${digits(2)}`,
]);

export const phoneNumberPlaceholder = formatStr;
export const phoneNumberPattern = `^\\+${COUNTRY_CODE} \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$`;

export function formatPhoneNumber(
	prevNumberStr: string,
	numberStr: string
): string {
	// Направления заполнения номера - добавление, удаление.
	enum InputDirection {
		ADD,
		REMOVE,
	}

	const direction: InputDirection =
		prevNumberStr.length >= numberStr.length
			? InputDirection.REMOVE
			: InputDirection.ADD;

	let onLastDigit = false;
	let formatString = formatStr;
	let inputStr = numberStr;
	let tempStr = '';

	// Любой первый символ добавляет '+'.
	tempStr += inputStr.match(REGEX.anyFirst) ? '+' : '';

	// Если номер начинается с '7', '+7' или '8', добавить код страны '7'.
	tempStr += inputStr.match(REGEX.startsWithCountryCode)
		? COUNTRY_CODE
		: '';

	const matches = inputStr
		.replace(REGEX.startsWithCountryCode, '')
		.matchAll(REGEX.isDigit);

	const placeholders = formatString.matchAll(
		REGEX.digitPlaceholder
	);

	// Заполнение ячеек для цифр номера.
	// При полном или перезаполнении последующие цифры пропускаются.
	for (const match of matches) {
		const placeholder = placeholders.next();
		if (placeholder.done) {
			onLastDigit = true;
			break;
		}

		const index = placeholder.value.index as number;
		formatString =
			formatString.slice(0, index) +
			match[0] +
			formatString.slice(index + 1);
	}
	if (placeholders.next().done) {
		onLastDigit = true;
	}

	// В случае ввода (не удаления) номера добавить в первую незаполненную
	// ячейку цифру '0' для правильного отображения разделяющих символов
	// маски номера.
	if (direction === InputDirection.ADD) {
		formatString = formatString.replace(DIGIT_PLACEHOLDER, '0');
	}

	// Маскированный номер получается путем обрезки строки формата,
	// в которой были заполнены ячейки.
	// Индекс обрезки определяется последней цифрой в строке формата.
	// В случае удаления номера или нахождении курсора на последней цифре
	// необходимо сдвинуть индекс на 1, чтобы не обрезать последнюю цифру.
	const cutIndexShift =
		direction === InputDirection.REMOVE || onLastDigit ? 1 : 0;
	const cutIndex =
		(formatString.match(REGEX.lastDigit)?.index ?? 0) +
		cutIndexShift;
	const formattedNumber = formatString.substring(0, cutIndex);

	// Если временная строка имеет полный код страны '+7',
	// вернуть маскированный номер.
	// Маскированный номер всегда содержит полный код страны.
	// Если код страны еще не введен полностью,
	// вернуть временную строку.
	const hasCompleteCountryCode = tempStr === `+${COUNTRY_CODE}`;
	return hasCompleteCountryCode ? formattedNumber : tempStr;
}

export function stripFormat(formattedPhoneNumber: string): string {
	return formattedPhoneNumber.replaceAll(REGEX.allowedChars, '');
}

function digits(n: number) {
	return DIGIT_PLACEHOLDER.repeat(n);
}

function makeFormatString(fields: string[]): string {
	let output = '';
	for (const field of fields) {
		output += field;
	}
	return output;
}
