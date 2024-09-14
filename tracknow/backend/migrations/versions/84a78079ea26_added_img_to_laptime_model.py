"""added img to laptime model

Revision ID: 84a78079ea26
Revises: ce66c81c9afc
Create Date: 2024-09-14 19:00:47.271987

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '84a78079ea26'
down_revision = 'ce66c81c9afc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('laptimes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image', sa.String(length=255), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('laptimes', schema=None) as batch_op:
        batch_op.drop_column('image')

    # ### end Alembic commands ###
