
const mandatoryFieldsByModel = {
    Account: ['userId', 'type', 'provider', 'providerAccountId'], // refresh_token, access_token, etc. are optional
    Session: ['sessionToken', 'userId', 'expires'],
    User: ['email'], // name, emailVerified, image, hashedPassword, role are optional
    VerificationToken: ['identifier', 'token', 'expires'],
    Author: ['name'], // desc, image are optional
    Tag: ['name'],
    Genre: ['name'],
    BookInfo: ['title', 'intro'], // isbn, publishingYear, image, intro, desc are optional
    BookAuthor: ['bookId', 'authorId'], // No optional fields, but ensure existence in related tables
    BookCreator: ['bookId', 'creatorId'], // No optional fields, but ensure existence in related tables
    BookTag: ['bookId', 'tagId'], // No optional fields, but ensure existence in related tables
    BookGenre: ['bookId', 'genreId'], // No optional fields, but ensure existence in related tables
    Chapter: ['bookId', 'serial', 'title', 'content'], // audioLink, language are optional
    Byte: ['bookId', 'serial', 'title', 'content'], // audioLink, language are optional
};



function validateMandatoryFields(modelName, requestBody) {
    const mandatoryFields = mandatoryFieldsByModel[modelName] || [];
    const missingFields = mandatoryFields.filter(field => {
        return !(field in requestBody) || requestBody[field] === null || requestBody[field] === '';
    });

    return {
        isValid: missingFields.length === 0,
        missingFields,
    };
}

export default validateMandatoryFields;
