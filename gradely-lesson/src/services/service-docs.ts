class serviceDoc {
    //  GET FILE BACKGROUND COLOR
    getDocBgcolor(type:string) {
        if (type === 'pdf') return 'light-pdf-red';
        else if (type === 'doc' || type === 'docx') return 'light-doc-blue';
        else if (type === 'xls' || type === 'xlsx') return 'light-excel-green';
        else if (type === 'ppt' || type === 'pptx') return 'light-ppt-red';
        else if (type === 'txt') return 'light-txt-grey';
        else return 'brand-inverse-light';
    }

    // GET FILE ICON AND COLOR STYLE
    getDocIconStyle(type:string) {
        if (type === 'pdf') return 'icon-pdf darkish-pdf-red';
        else if (type === 'doc' || type === 'docx')
            return 'icon-doc darkish-doc-blue';
        else if (type === 'xls' || type === 'xlsx')
            return 'icon-xls darkish-excel-green';
        else if (type === 'ppt' || type === 'pptx')
            return 'icon-ppt darkish-ppt-red';
        else if (type === 'txt') return 'icon-txt darkish-txt-grey';
        else return 'icon-pdf brand-tonic';
    }

    // GET DOCUMENT TYPE BASED ON EXTENSION
    getDocType(extension:string) {
        if (extension === 'pdf') return 'PDF';
        else if (extension === 'txt') return 'Text';
        else if (['doc', 'docx'].includes(extension)) return 'Word';
        else if (['xlx', 'xlsx'].includes(extension)) return 'Excel';
        else if (['ppt', 'pptx'].includes(extension)) return 'Powerpoint';
        else return;
    }
}

export const $serviceDoc = new serviceDoc();