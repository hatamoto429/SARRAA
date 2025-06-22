# Fix broken original original_XSS.csv by removing inner commas
# Create new fixed XSS_fixed.csv

# Removes loose , from middle of text payload to stop breaking parsing of classifier ,1 or ,0

with open("datasets/original_XSS.csv", "r", encoding="utf-8") as infile, \
        open("datasets/XSS_fixed.csv", "w", encoding="utf-8") as outfile:
    for line in infile:
        # Strip newline
        line = line.strip()

        # Check if line ends with ,0 or ,1
        if line.endswith(",0") or line.endswith(",1"):
            label = line[-2:]  # ,0 or ,1
            text = line[:-2]  # all content before label
            text_clean = text.replace(",", "")  # remove inner commas
            outfile.write(text_clean + label + "\n")
        else:
            # fallback — write line as-is if it doesn't match pattern
            outfile.write(line + "\n")
