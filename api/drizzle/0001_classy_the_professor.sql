ALTER TABLE `users` RENAME COLUMN "isBlocked" TO "is_blocked";--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_ratings` (
	`user_id` integer,
	`dish_id` integer,
	`rating` integer,
	PRIMARY KEY(`user_id`, `dish_id`)
);
--> statement-breakpoint
INSERT INTO `__new_ratings`("user_id", "dish_id", "rating") SELECT "user_id", "dish_id", "rating" FROM `ratings`;--> statement-breakpoint
DROP TABLE `ratings`;--> statement-breakpoint
ALTER TABLE `__new_ratings` RENAME TO `ratings`;--> statement-breakpoint
PRAGMA foreign_keys=ON;