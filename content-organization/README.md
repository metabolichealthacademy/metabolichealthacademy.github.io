# Content Organization & Phase 4 Setup

This directory contains guides and tools for organizing your educational content as part of Phase 4: Build the Content System.

## Quick Start

1. **Review the structure**: See the directory tree below
2. **Read the migration guide**: `MIGRATION_GUIDE.md` for moving v3 content
3. **Use the template**: `articles/TEMPLATE.html` for creating new articles
4. **Follow guidelines**: Each subdirectory has a README with specific instructions

## Directory Structure

```
metabolichealthacademy.github.io/
│
├── articles/                          # Educational content
│   ├── cornerstone/                   # Main comprehensive guides
│   ├── featured/                      # Currently featured articles
│   ├── research-summaries/            # Research findings
│   ├── TEMPLATE.html                  # Use this to create new articles
│   ├── INDEX.md                       # Article catalog and links
│   └── README.md                      # Article guidelines
│
├── images/                            # Visual assets
│   ├── diagrams/                      # Process diagrams, flowcharts
│   ├── charts/                        # Data visualizations
│   ├── illustrations/                 # Graphics and illustrations
│   ├── featured/                      # Article feature images
│   └── README.md                      # Image guidelines
│
├── videos/                            # Video content metadata
│   ├── metadata/                      # JSON metadata for each video
│   ├── transcripts/                   # Video transcripts
│   ├── mapping.json                   # Links videos to articles
│   └── README.md                      # Video guidelines
│
└── content-organization/              # This directory
    ├── MIGRATION_GUIDE.md             # How to migrate v3 content
    ├── CONTENT_CHECKLIST.md           # Quality assurance checklist
    └── README.md                      # This file
```

## Phase 4 Milestones

### Phase 4.1: Create Cornerstone Educational Pages
- [ ] Identify 3-5 cornerstone topics
- [ ] Create main guide for each topic
- [ ] Add to homepage with clear navigation
- [ ] Ensure SEO optimization
- [ ] Create internal linking strategy

**Files to create**: `articles/cornerstone/[topic-name].html`

### Phase 4.2: Add Article Templates
- [ ] Review the article template (`articles/TEMPLATE.html`)
- [ ] Use template for all new articles
- [ ] Ensure consistent structure and styling
- [ ] Document any custom sections needed
- [ ] Create contributor guidelines

**Reference**: `articles/TEMPLATE.html`, `articles/README.md`

### Phase 4.3: Connect YouTube Videos to Articles
- [ ] Upload videos to YouTube channel
- [ ] Create metadata for each video
- [ ] Map videos to articles
- [ ] Test embeds and responsive design
- [ ] Update article template to include videos

**Files to create**: `videos/metadata/[video-id].json`, update `videos/mapping.json`

### Phase 4.4: Add Metabolic Evidence Brief Signup
- [ ] Design email signup form
- [ ] Integrate with email service (Mailchimp, ConvertKit, etc.)
- [ ] Add signup CTAs to strategic locations
- [ ] Implement double-opt-in for compliance
- [ ] Create welcome email sequence

**Reference**: See linked GitHub issues (#13-16)

## Content Requirements

### Each Article Must Include:
- ✓ Accurate, evidence-based information
- ✓ Clear structure with headings and sections
- ✓ Key concepts explained
- ✓ Research summary with citations
- ✓ Practical applications
- ✓ Related articles links
- ✓ References and citations
- ✓ Author bio and credentials
- ✓ Publication and review dates
- ✓ Medical disclaimer

### Visual Hierarchy:
- Descriptive title (H1)
- Meta information (author, dates, category)
- Overview/introduction
- Key concepts box
- Main content sections (H2)
- Evidence summary box
- Video integration (optional)
- Practical applications
- Related articles
- References
- Author bio
- Review notice

## File Naming Conventions

### Articles
- `article-title-keywords.html`
- Example: `2024-08-insulin-resistance.html`

### Images
- Descriptive with type: `diagram-insulin-pathway.png`
- Example: `chart-metabolic-syndrome-prevalence.png`

### Videos
- Based on YouTube ID: `metadata/dQw4w9WgXcQ.json`

## Content Quality Standards

Every article should meet these standards:

**Accuracy**
- Based on current scientific evidence
- Multiple sources cited where possible
- References included and verified

**Clarity**
- Clear, accessible language
- Complex concepts explained simply
- Proper formatting and structure
- Good readability (short paragraphs, white space)

**Completeness**
- All major aspects of topic covered
- Balanced perspective on controversies
- Practical applications included
- Related topics linked

**Freshness**
- Regular review schedule
- Update dates documented
- Outdated information flagged
- New research incorporated

**Accessibility**
- Mobile-responsive design
- Alt text for all images
- Closed captions for videos
- Clear navigation structure
- High contrast text

## v3 Archive Inspection Record

The former public archive `metabolic-health-academy-v3-transformed.zip` was
inspected during Phase 1 and removed from the publishing branch. Git history
retains the original binary if it is needed later.

- SHA-256: `456c6c5e060c68a6c6963e54b4b0ee6bcc8ccd8e68d11ee252dd63bb9c69b7cd`
- Files inspected: 34
- Contents: HTML pages, CSS, JavaScript, XML/text publishing files, and three PNG images
- Safety check: no absolute paths or parent-directory traversal entries were present
- Publication decision: do not expose the development archive through GitHub Pages

## Publishing Workflow

1. **Create**: Write article using `TEMPLATE.html`
2. **Review**: Self-check against quality standards
3. **Format**: Ensure proper structure and metadata
4. **Test**: Check links, images, videos, mobile view
5. **Publish**: Upload to appropriate subdirectory
6. **Link**: Add to INDEX.md and homepage
7. **Promote**: Share on social media/email
8. **Monitor**: Track engagement and update as needed

## Maintenance Schedule

- **Weekly**: Monitor new content submissions
- **Monthly**: Review article engagement metrics
- **Quarterly**: Review and update cornerstone articles
- **Annually**: Comprehensive audit of all content

## Related Issues

These GitHub issues track Phase 4 implementation:
- **#14** Phase 4.1: Create cornerstone educational pages
- **#15** Phase 4.2: Add article templates
- **#16** Phase 4.3: Connect YouTube videos to matching articles
- **#13** Phase 4.4: Add Metabolic Evidence Brief signup

## Questions or Help?

Refer to:
- `articles/README.md` for article-specific questions
- `images/README.md` for image organization
- `videos/README.md` for video management
- `MIGRATION_GUIDE.md` for migrating old content
