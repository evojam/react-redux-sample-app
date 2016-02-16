function chr4(): string {
    return Math.random().toString(29).slice(-4);
}

function chr4date(): string {
    return new Date().getTime().toString(31).slice(-4);
}

export function uniqueID(): string {
    return chr4() + chr4() + `-${ chr4() }-${ chr4() }-${ chr4() }-` + chr4() + chr4date() + chr4();
}

// NOTE: This format of 8 chars, followed by 3 groups of 4 chars, followed by 12 chars
//       is known as a UUID and is defined in RFC4122 and is a standard for generating unique IDs.
//       This function DOES NOT implement this standard. It simply outputs a string
//       that looks similar. The standard is found here: https://www.ietf.org/rfc/rfc4122.txt
//
// See: https://gist.github.com/gordonbrander/2230317#gistcomment-1618310