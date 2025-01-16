PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_dishes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`description` text,
	`image` text,
	`price` integer
);
--> statement-breakpoint
INSERT INTO `__new_dishes`("id", "name", "description", "image", "price") SELECT "id", "name", "description", "image", "price" FROM `dishes`;--> statement-breakpoint
DROP TABLE `dishes`;--> statement-breakpoint
ALTER TABLE `__new_dishes` RENAME TO `dishes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;