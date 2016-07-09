# bionode-pgp

[![Join the chat at https://gitter.im/bionode-hack/bionode-pgp-billy-gene](https://badges.gitter.im/bionode-hack/bionode-pgp-billy-gene.svg)](https://gitter.im/bionode-hack/bionode-pgp-billy-gene?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Personal Genome Project
-----------------------

Hompage: http://www.personalgenomes.org

Steps to metadata
-----------------

1: How do I find the set of (human) datasets that are available?

Scrape the table at https://my.pgp-hms.org/public_genetic_data

https://github.com/bionode-hack/bionode-pgp/blob/master/example_responses/Personal_Genome_Project_Public_Genetic_Data.txt

There is one row per participant.

2: How do I request information on an individual dataset (or maybe a batch of datasets)?

Treat each participant as a dataset. There is information about each participant in a page linked into the Participant field in the table, e.g. to https://my.pgp-hms.org/profile/hu63165B.

Example: https://github.com/bionode-hack/bionode-pgp/blob/master/example_responses/Personal_Genome_Project_hu63165B.txt

3: Where do I find the dataset attributes?

Accession number: Use the ID in the Participant field link text, e.g. hu63165B.

URL: The link in the Download field

Title: 'Public genetic data for PGP participant _ID_'

Description: (see above) It would be good to summarise some of the Participant info in the description. From Demographic Information, include Gender, Blood Type, Race. Also include the list of Conditions, e.g,  'Conditions:  Acne, Allergic Rhinitis, Duodenal Atresia, ...'
 
Technology: Not directly specified

Assay type: Not directly specified. Might be inferred from 'Data type' value, e.g. 23andMe -> SNP array